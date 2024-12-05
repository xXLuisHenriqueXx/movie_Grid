import React, { useEffect } from 'react';
import { tv } from 'tailwind-variants';

const card = tv({
  slots: {
    containerMain: 'fixed top-0 left-0 min-w-full min-h-full bg-slate-950 bg-opacity-90 z-[98]',
    containerModal: 'absolute bottom-0 left-0 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col p-4 md:px-6 lg:px-8 2xl:p-8 w-full md:w-[90%] lg:w-2/3 xl:w-3/5 2xl:w-2/5 h-3/4 xl:h-[90%] 2xl:h-[80%] overflow-auto bg-slate-900 rounded-t-3xl md:rounded-lg z-[99]',
    containerText: 'flex flex-col items-center',
    containerExtraInfo: 'flex flex-row justify-between items-center mt-8',
    containerAgeRestriction: 'flex flex-row items-center p-2 bg-slate-950 rounded-md',
    imagePlaceholder: 'flex-shrink-0 w-full md:w-[80%] h-56 md:h-72 mx-auto mb-8 bg-slate-700 rounded-md',
    title: 'mb-2 text-3xl font-oswald font-bold text-slate-400',
    ownerDirectorText: 'mb-2 text-lg text-center font-oswald font-semibold text-slate-300',
    descriptionText: 'text-lg text-center font-inter font-medium text-slate-400',
    createText: 'text-base font-inter font-medium text-slate-400',
    spanAgeRestriction: 'flex justify-center items-center h-8 aspect-square mr-2 rounded-md',
    ageRestrictionText: 'text-lg font-inter font-medium text-white'
  },
  variants: {
    ageRestriction: {
      0: {
        spanAgeRestriction: 'bg-green-500'
      },
      10: {
        spanAgeRestriction: 'bg-blue-500'
      },
      12: {
        spanAgeRestriction: 'bg-yellow-500'
      },
      14: {
        spanAgeRestriction: 'bg-orange-500'
      },
      16: {
        spanAgeRestriction: 'bg-red-500'
      },
      18: {
        spanAgeRestriction: 'bg-black'
      }
    }
  }
});

const { containerMain, containerModal, containerText, containerExtraInfo, containerAgeRestriction, imagePlaceholder, title, ownerDirectorText, descriptionText, createText, spanAgeRestriction, ageRestrictionText } = card();

function DetailsModal({ setShowModal, item, type }) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    }
  }, []);

  return (
    <div className={containerMain()} onClick={() => setShowModal(false)}>
      <div className={containerModal()} onClick={(e) => e.stopPropagation()}>
        <div className={imagePlaceholder()} />

        <div className={containerText()}>
          <h2 className={title()}>
            {item.title}
            {type === "Movie" && <> ({item.durationMinutes}m)</>}
          </h2>
          <p className={ownerDirectorText()}>
            {item.producer ? `Produtor: ${item.producer}` : `Diretor: ${item.director}`}
          </p>
          <p className={descriptionText()}>{item.description}</p>
        </div>

        {type === "Serie" && (
          <div className='
            h-80 overflow-y-auto
          '>
            {item.episodes.map((episode) => (
              <div key={episode.id} className='
                flex flex-row 
                w-full md:w-[80%] h-16 mx-auto mt-4 mb-2 border-slate-700
              '>
                <div className='
                  w-1/4 h-full bg-slate-700 mr-4
                '/>
                <div className='
                  flex flex-col justify-center
                  w-3/4 h-full
                '>
                  <h2 className='
                    text-md font-oswald font-semibold text-slate-400
                  '>{episode.title}</h2>
                  <p className='
                    text-sm font-inter font-medium text-slate-600
                  '>{episode.description}</p>
                  </div>
                </div>
            ))}
              </div>
            )}

            <div className={containerExtraInfo()}>
              <h3 className={createText()}>Criado em: <span className='font-extrabold'>{item.releaseYear}</span></h3>

              <div className={containerAgeRestriction()}>
                <span className={spanAgeRestriction({ ageRestriction: item.ageRestriction })}>
                  <h3 className={ageRestrictionText()}>{item.ageRestriction === 0 ? 'L' : item.ageRestriction}</h3>
                </span>

                <h3 className={ageRestrictionText()}>
                  {item.ageRestriction === 0 ? 'Livre' : `${item.ageRestriction} Anos`}
                </h3>
              </div>
            </div>
          </div>
    </div>
      )
}

      export default DetailsModal;