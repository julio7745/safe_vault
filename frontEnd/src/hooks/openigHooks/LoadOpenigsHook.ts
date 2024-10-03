
import React, { useState } from 'react'

import LoadProfileImageHook from '@/hooks/commonHooks/LoadProfileImageHook';
import HttpRequestHook from '@/hooks/commonHooks/HttpRequestHook';

import { useLoading } from '@/contexts/LoadingContext';
import { forEach } from 'lodash';

interface openingInterface {
  _id: string
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

interface ProfileImages {
  [openingId: string]: {
    profileImage: string;
    profileImageExtension: string;
  };
}

export default () => {

  const LoadProfileImageServices = LoadProfileImageHook()
  const httpRequestServices = HttpRequestHook()
  const { setLoading } = useLoading();

  const LoadOpenigsHook = {

    LoadOpenigsService: async ({
      setOpenings,
      setProfileImages
    } : {
      setOpenings: React.Dispatch<React.SetStateAction<openingInterface[]>>,
      setProfileImages: React.Dispatch<React.SetStateAction<ProfileImages>>,
    }) => {

      setLoading(true);

      httpRequestServices.get('opening/getAll')
      .then( async response => {

        const openings = response.data.list.reverse()
        setOpenings(openings)

        const imageCache: { [key: string]: string } = {};

        for (const opening of openings) {

          const fullName = `${opening.name}_${opening.lastName}`;

          if (!imageCache[fullName]) {

            await LoadProfileImageServices.Load({ name: opening.name, lastName: opening.lastName })
            .then((response) => {

              imageCache[fullName] = 'ok';
              setProfileImages(prevProfileImages => ( {
                ...prevProfileImages,
                [fullName]: { profileImage: response.profileImage, profileImageExtension: response.profileImageExtension },
              }))

            })

          }

        }

        setLoading(false)

      })

    },

  }

  return LoadOpenigsHook
    
};



