import React, { useState, useMemo } from 'react'
import { Box, Typography, IconButton, Collapse, List, ListItem, ListItemText } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

interface TreeNode {
    id: string | number
    name: string
    children?: TreeNode[]
}

interface EntitlementSummaryProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userEntitlements: any[]
}

// Recursive Tree Node Component
const TreeNodeItem: React.FC<{ node: TreeNode; level: number }> = ({ node, level }) => {
    const [open, setOpen] = useState(false)
    const hasChildren = node.children && node.children.length > 0

    return (
        <>
            <ListItem
                sx={{
                    minHeight: '25px',
                    py: 0,
                    pl: level * 2.5,
                }}
                disablePadding
            >
                {hasChildren ? (
                    <IconButton
                        size="small"
                        onClick={() => setOpen(!open)}
                        sx={{ p: 0.25, mr: 0.5 }}
                    >
                        {open ? <RemoveIcon fontSize="small" /> : <AddIcon fontSize="small" />}
                    </IconButton>
                ) : (
                    <Box sx={{ width: 28 }} /> // Spacer for alignment
                )}
                <ListItemText
                    primary={node.name}
                    primaryTypographyProps={{
                        sx: { fontSize: '14px' },
                    }}
                />
            </ListItem>
            {hasChildren && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="ul" disablePadding sx={{ listStyleType: 'none', m: 0 }}>
                        {node.children?.map((child) => (
                            <TreeNodeItem key={child.id} node={child} level={level + 1} />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    )
}

const EntitlementSummary: React.FC<EntitlementSummaryProps> = ({ userEntitlements }) => {
    // Build tree data from userEntitlements (matching Angular's setTree logic)
    const treeData = useMemo((): TreeNode[] => {
        if (!userEntitlements || userEntitlements.length === 0) return []

        const buildTree: TreeNode[] = []

        for (const role of userEntitlements) {
            // If role has no SBUs, show "No Entitlements"
            if (!role.sbus || role.sbus.length === 0) {
                buildTree.push({
                    id: `role-${role.userRoleId}`,
                    name: role.userRoleName,
                    children: [{ id: -1, name: 'No Entitlements' }],
                })
                continue
            }

            const sbusList: TreeNode[] = []

            for (const sbu of role.sbus) {
                const clientsList: TreeNode[] = []

                for (const client of sbu.clients || []) {
                    const projectList: TreeNode[] = []

                    for (const project of client.projects || []) {
                        projectList.push({
                            id: `project-${project.projectId}`,
                            name: project.projectName,
                        })
                    }

                    clientsList.push({
                        id: `client-${client.clientId}`,
                        name: client.clientName,
                        children: projectList.sort((a, b) => a.name.localeCompare(b.name)),
                    })
                }

                sbusList.push({
                    id: `sbu-${sbu.sbuId}`,
                    name: sbu.sbuName,
                    children: clientsList.sort((a, b) => a.name.localeCompare(b.name)),
                })
            }

            buildTree.push({
                id: `role-${role.userRoleId}`,
                name: role.userRoleName,
                children: sbusList.sort((a, b) => a.name.localeCompare(b.name)),
            })
        }

        // Sort roles alphabetically
        return buildTree.sort((a, b) => a.name.localeCompare(b.name))
    }, [userEntitlements])

    return (
        <Box
            sx={{
                backgroundColor: '#e1e2e2',
                ml: 1,
                pt: 1,
                pb: 1,
            }}
        >
            {/* Heading */}
            <Box sx={{ ml: 3.5 }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 500 }}>
                    Entitlement Summary
                </Typography>
            </Box>

            {/* Tree Container */}
            <Box
                sx={{
                    height: 'fit-content',
                    maxHeight: '500px',
                    width: '100%',
                    overflowY: 'auto',
                    overflowX: 'auto',
                    backgroundColor: '#e1e2e2',
                }}
            >
                {treeData.length > 0 ? (
                    <List component="ul" disablePadding sx={{ listStyleType: 'none', m: 0, pl: 1 }}>
                        {treeData.map((node) => (
                            <TreeNodeItem key={node.id} node={node} level={0} />
                        ))}
                    </List>
                ) : (
                    <Typography sx={{ ml: 3.5, py: 2, fontSize: '14px', color: 'text.secondary' }}>
                        No entitlements available
                    </Typography>
                )}
            </Box>
        </Box>
    )
}

export default EntitlementSummary
