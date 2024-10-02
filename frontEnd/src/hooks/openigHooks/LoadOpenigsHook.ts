
import React from 'react'

import HttpRequestHook from '../commonHooks/HttpRequestHook';

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
      //   response.data.list.forEach(async (opening: openingInterface, index: number) => {
      //     const response = (await HttpRequestService.post('imageProfile/load', {name: opening.name, lastName: opening.lastName})).data
      //     const profileImage: string = response.profileImage
      //     const profileImageExtension: string = response.profileImageExtension
      //     setOpenings((prevOpenings) => {
      //       const newOpenigList = [...prevOpenings]
      //       newOpenigList[index].profileImage = profileImage
      //       newOpenigList[index].profileImageExtension = profileImageExtension
      //       return newOpenigList
      //     })
      // })
      })

    },

  }

  return LoadOpenigsHook
    
};



