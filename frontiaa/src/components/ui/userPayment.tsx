import React from 'react'
import { Button } from './button'
import { Separator } from './separator'

const userPayment = () => {
    return (
        <div className='flex flex-col p-2 w-full  bg-byed rounded-lg gap-4  font-general-sans'>
            <div className='gap-6 flex flex-col p-2  rounded-lg'>

                <div className='flex flex-col gap-2'>
                <div className='flex justify-between   '>
                        <span className='text-base font-normal'>Votre solde :</span>
                        <span className='text-sm font-light text-gray-500'> 100 DH</span>
                    </div>
                    <div className='flex  justify-between '>
                        <span className='text-base font-normal'>Total :</span>
                        <span className='text-sm font-light text-gray-500'> 25 DH</span>
                    </div>
                   
                </div>
                
                <Separator/>

            </div>
            

            <div className='w-full flex flex-col gap-2' >
                <Button>confirmer</Button>
                <Button className='bg-red-500'>annuler</Button>
            </div>


        </div>
    )
}

export default userPayment