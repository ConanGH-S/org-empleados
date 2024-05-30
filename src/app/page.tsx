import { Heart } from 'lucide-react'

import Footer from '@/components/core/Footer'
import LayoutGrid from '@/components/core/Layout'

import { LoginForm } from './LoginForm'

export default function Page () {
  return (
    <LayoutGrid layoutType='center' className='grid-rows-[1fr_auto]'>
      <LoginForm />
      <Footer className='flex justify-center border-t'>
        <p className='flex gap-3'><span>Made by Stiven Blandon with</span> <Heart className='stroke-red-500' /></p>
      </Footer>
    </LayoutGrid>
  )
}
