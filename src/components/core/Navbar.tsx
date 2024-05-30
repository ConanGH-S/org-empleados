'use client'

import Link from 'next/link'
import * as React from 'react'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

import { Button } from '../ui/button'

export default function Navbar () {
  return (
    <header>
      <NavigationMenu className='h-16 max-w-none w-full flex justify-center'>
        <NavigationMenuList className='w-full'>
          <NavigationMenuItem>
            <Link href='/dashboard' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Inicio
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <Button className='absolute right-10'>Cerrar sesión</Button>
      </NavigationMenu>
    </header>
  )
}
