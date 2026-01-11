import iconData from '../../assets/icons/material-icons.json'
import type { IconDetailsDto } from '../models/icon.model'
import * as MuiIcons from '@mui/icons-material'

export const getAllMaterialIcons = (): IconDetailsDto[] => {
  return iconData.icons.map((icon) => ({
    name: icon.name,
    displayName: icon.name,
    tags: icon.tags,
  }))
}

export const getIconComponent = (iconName: string) => {
  const componentName = iconName
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')

  const IconComponent = (MuiIcons as any)[componentName]
  return IconComponent || MuiIcons.HelpOutline 
}
