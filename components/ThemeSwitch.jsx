'use client'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Switch } from "@/components/ui/switch"
import { Moon, Sun } from 'lucide-react'

function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme();
    const [dark, setDark] = useState(true);

    useEffect(()=>{
        if(dark){
            setTheme('dark');
        }
        else{
            setTheme('light');
        }
    }, [dark])

    return (
        <>
            <div className='flex gap-2'>
                <Moon />
                <Switch onClick={()=> setDark(!dark)}> Swtich </Switch>
                <Sun/>
            </div>
        </>
    )
}

export default ThemeSwitch