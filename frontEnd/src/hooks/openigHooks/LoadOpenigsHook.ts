
import React from 'react'

import LoadProfileImageHook from '@/hooks/commonHooks/LoadProfileImageHook';
import HttpRequestHook from '@/hooks/commonHooks/HttpRequestHook';

import { useLoading } from '@/contexts/LoadingContext';

interface openingInterface {
	name: string,
	lastName: string,
	month: string,
	minute: number,
	year: number,
	hour: number,
	day: number,
  empty?: boolean,
  profileImage?: string 
  profileImageExtension?: string 
}

export default () => {

  const LoadProfileImageServices = LoadProfileImageHook()
  const httpRequestServices = HttpRequestHook()

  const { setLoading } = useLoading();

  const LoadOpenigsHook = {

    LoadOpenigsService: async ({
      setOpenings,
    } : {
      setOpenings: React.Dispatch<React.SetStateAction<openingInterface[]>>,
    }) => {

      setLoading(true);
      await httpRequestServices.get('opening/getAll')
      .then( async response => {
        setLoading(false)
        setOpenings(response.data.list)
        response.data.list.forEach(async (opening: openingInterface, index: number) => {
          const setImage = ({ 
            profileImage, 
            profileImageExtension
          }:{ 
            profileImage: string, 
            profileImageExtension: string 
          }) => {
            setOpenings((prevOpenings) => {
              const newOpenigList = [...prevOpenings]
              newOpenigList[index].profileImage = profileImage
              newOpenigList[index].profileImageExtension = profileImageExtension
              return newOpenigList
            })
          }
          LoadProfileImageServices.Load({name: opening.name, lastName: opening.lastName, setImage })
        })
      })

    },

  }

  return LoadOpenigsHook
    
};



