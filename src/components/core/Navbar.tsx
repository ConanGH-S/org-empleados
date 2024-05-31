'use client'

import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

import { logoutRedirect } from '@/lib/actions'

import { Button } from '../ui/button'
import { toast } from '../ui/use-toast'

export default function Navbar () {
  const [isSending, setIsSending] = useState<boolean>(false)
  const loginButtonContent = isSending ? 'Cerrando sesión...' : 'Cerrar sesión'

  const logout = async () => {
    setIsSending(true)
    try {
      await fetch('http://localhost:5088/api/v1/logout', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      logoutRedirect()
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: '¡Ups!',
        description: 'Ha ocurrido un error, inténtalo de nuevo',
        duration: 4000
      })
      setIsSending(false)
    }
  }

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
          <NavigationMenuItem>
            <Button variant='ghost' onClick={logout} aria-disabled={isSending} disabled={isSending}>{isSending ? (<Loader2 className='mr-2 h-4 w-4 animate-spin' />) : null}
              <span>{loginButtonContent}</span>
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
