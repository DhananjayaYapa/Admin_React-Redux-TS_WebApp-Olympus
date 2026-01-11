/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment'

export const validateFormData = async (data: { [key: string]: any }): Promise<[any, boolean]> => {
  let isValid = true
  let validatedData = data

  return new Promise((resolve) => {
    for (const [field, fieldData] of Object.entries(data)) {
      if (fieldData.validator === 'text') {
        let error = null
        if (fieldData.isRequired && !fieldData.value) {
          error = 'This field is required.'
          isValid = false
        }
        validatedData = {
          ...validatedData,
          [field]: {
            ...(fieldData as object),
            error: error,
          },
        }
      }
      if (fieldData.validator === 'string') {
        let error = null
        if (fieldData.isRequired) {
          const isEmpty = Array.isArray(fieldData.value)
            ? fieldData.value.length == 0
            : !fieldData.value || fieldData.value.trim == ''
          if (isEmpty) {
            error = `${fieldData.name} is required`
            isValid = false
          }
        }
        validatedData = {
          ...validatedData,
          [field]: {
            ...(fieldData as object),
            error: error,
          },
        }
      }
      if (fieldData.validator === 'number') {
        let error = null
        if (
          fieldData.isRequired &&
          (!fieldData.value ||
            (!!fieldData.value &&
              Object.keys(fieldData.value).length === 0 &&
              fieldData.value.constructor === Object))
        ) {
          error = 'Field is empty'
          isValid = false
        }
        if (fieldData.value > 100) {
          error = 'Value should not be grater than 100'
          isValid = false
        }
        if (fieldData.value < 0) {
          error = 'Value should not be lower than 0'
          isValid = false
        }
        validatedData = {
          ...validatedData,
          [field]: {
            ...(fieldData as object),
            error: error,
          },
        }
      }
      if (fieldData.validator === 'numbergreaterthanzero') {
        let error = null
        if (
          fieldData.isRequired &&
          (!fieldData.value ||
            (!!fieldData.value &&
              Object.keys(fieldData.value).length === 0 &&
              fieldData.value.constructor === Object))
        ) {
          error = 'Field is empty'
          isValid = false
        }
        if (fieldData.value > 100) {
          error = 'Value should not be grater than 100'
          isValid = false
        }
        if (fieldData.value <= 0 && fieldData.value !== null) {
          error = 'Value should not be lower than or 0'
          isValid = false
        }
        validatedData = {
          ...validatedData,
          [field]: {
            ...(fieldData as object),
            error: error,
          },
        }
      }

      if (fieldData.validator === 'leaveCount') {
        let error = null
        const value = fieldData.value
        const min = fieldData.min ?? 0
        const max = fieldData.max

        if (fieldData.isRequired && (value === null || value === undefined || value === '')) {
          error = fieldData.requiredError || 'This field is required.'
          isValid = false
        } else if (value < min) {
          error = fieldData.minError || `Value cannot be less than ${min}`
          isValid = false
        } else if (max !== undefined && value > max) {
          error = fieldData.maxError || `Value cannot be more than ${max}`
          isValid = false
        }
        validatedData = {
          ...validatedData,
          [field]: {
            ...(fieldData as object),
            error: error,
          },
        }
      }

      if (fieldData.validator === 'date') {
        let error = null
        if (fieldData.isRequired && (!fieldData.value || fieldData.value === null)) {
          error = 'This Date is required.'
          isValid = false
        }
        if (
          fieldData.isRequired &&
          fieldData.value !== null &&
          (!moment(fieldData.value).isValid() || fieldData.value === 'Invalid date')
        ) {
          error = 'Invalid date.'
          isValid = false
        }
        validatedData = {
          ...validatedData,
          [field]: {
            ...(fieldData as object),
            error: error,
          },
        }
      }

      if (fieldData.validator === 'object') {
        let error = null
        if (
          fieldData.isRequired &&
          (!fieldData.value ||
            (!!fieldData.value &&
              Object.keys(fieldData.value).length === 0 &&
              fieldData.value.constructor === Object))
        ) {
          error = 'Field is empty'
          isValid = false
        }
        validatedData = {
          ...validatedData,
          [field]: {
            ...(fieldData as object),
            error: error,
          },
        }
      }
      if (fieldData.validator === 'array') {
        let error = null
        if (!!fieldData.value && fieldData.value.length === 0 && fieldData.isRequired) {
          error = 'This field is required.'
          isValid = false
        }
        validatedData = {
          ...validatedData,
          [field]: {
            ...(fieldData as object),
            error: error,
          },
        }
      }

      if (fieldData.validator === 'email') {
        let error = null
        if (fieldData.isRequired && !fieldData.value) {
          error = 'Field is empty'
          isValid = false
        }
        if (fieldData.value) {
          /* eslint-disable no-useless-escape */
          const re =
            /^(([^<>()[\]\\.,'"\/+=;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if (re.test(fieldData.value)) {
            isValid = true
          } else {
            isValid = false
            error = 'Invalid email ID format'
          }
        }
        validatedData = {
          ...validatedData,
          [field]: {
            ...(fieldData as object),
            error: error,
          },
        }
      }

      if (fieldData.validator === 'file') {
        let error = null
        if (fieldData.isRequired && (fieldData.value?.length === 0 || !fieldData.value)) {
          error = 'This field is required.'
          isValid = false
        }

        if (!!fieldData.value && fieldData.value?.length > 0) {
          if (fieldData.isAllowed !== '*') {
            if (!validateFileExtension(fieldData.value.name, fieldData.isAllowed)) {
              error = 'Invalid File Format.'
              isValid = false
            }
            let invalidFileList = ''
            for (const file of fieldData.value) {
              if (!validateFileExtension(file.name, fieldData.isAllowed)) {
                invalidFileList += `${file.name},`
                isValid = false
              }
            }
            const invalidFileMessage = invalidFileList?.length > 0 ? ':Invalid file type`' : ''
            // error = `${invalidFileList} :Invalid file type`
            error = invalidFileList + invalidFileMessage
          }
        }

        validatedData = {
          ...validatedData,
          [field]: {
            ...(fieldData as object),
            error: error,
          },
        }
      }

      if (fieldData.validator === 'image') {
        let error = null
        if (fieldData.isRequired && !fieldData.value) {
          error = 'Image is required.'
          isValid = false
        }
        // Additional validation can be passed via imageValidationState
        if (fieldData.imageValidationState) {
          if (fieldData.imageValidationState.isInvalidImageRatio) {
            error = fieldData.error || 'Invalid image dimensions.'
            isValid = false
          }
          if (fieldData.imageValidationState.isInvalidImageSize) {
            error = 'Image size should be less than 1MB.'
            isValid = false
          }
        }
        validatedData = {
          ...validatedData,
          [field]: {
            ...(fieldData as object),
            error: error,
          },
        }
      }
    }
    resolve([validatedData, isValid])
  })
}
const validateFileExtension = (filename: any, format: any): boolean => {
  const extension = filename.split('.').pop().toLowerCase()
  return extension === format
}
