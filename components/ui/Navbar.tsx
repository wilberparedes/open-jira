import { FC, useContext } from 'react'

import NextLink from 'next/link'

import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

import { UIContext } from '@/context'

export const Navbar: FC = () => {
  const { openSideMenu } = useContext(UIContext)

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton size='large' edge='start' onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>
        <NextLink href='/' style={{ color: 'white', textDecoration: 'none' }}>
          <Typography variant='h6'>OpenJira</Typography>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}
