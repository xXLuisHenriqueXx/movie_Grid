import React, { useState } from 'react';
import { PlusCircle, Trash } from 'lucide-react';
import ModalCreate from './ModalCreate';
import { tv } from 'tailwind-variants';
import ContentService from '../../services/contentService';
import ModalCreateEpisode from './ModalCreateEpisode';

const card = tv({
    slots: {
        containerMain: 'w-full flex flex-row justify-between items-center',
        containerData: 'w-full py-2 bg-gray-900 rounded-sm',
        titleText: 'text-md font-medium text-gray-200',
        button: 'relative flex flex-row justify-between items-center p-1 mb-2 bg-blue-700 rounded-sm hover:bg-blue-500',
        buttonText: 'text-sm text-white font-bold',
        icon: 'ml-1',
        itemSpan: 'flex flex-row justify-between items-center p-2',
        itemText: 'relative max-w-xs text-white text-sm overflow-hidden truncate'
    }
});


const { containerMain, containerData, titleText, button, buttonText, icon, itemSpan, itemText } = card();

function DashboardTable({ title, type, data, showModalCreate, setShowModalCreate, tags }) {
    const [showModalEpisodes, setShowModalEpisodes] = useState(false);
    const [itemID, setItemID] = useState();

    const deleteItem = async (id) => {
        if (type === 'Movie') {
            const { status } = await ContentService.deleteMovie(id);

            if (status === 200) {
                alert('Filme deletado com sucesso');
                window.location.reload();
            }
        } else if (type === "TVShow" || type === 'SoapOpera') {
            const { status } = await ContentService.deleteSeriesAndItsEpisodes(id);

            if (status === 200) {
                alert('Série deletada com sucesso');
                window.location.reload();
            }
        } else if (type === 'Tag') {
            const { status } = await ContentService.deleteTag(id);

            if (status === 200) {
                alert('Tag deletada com sucesso');
                window.location.reload();
            }
        }
    };

    return (
        <>
            {showModalCreate &&
                <ModalCreate
                    showModal={showModalCreate}
                    setShowModal={setShowModalCreate}
                    type={type}
                    tags={tags}
                />
            }

            {showModalEpisodes &&
                <ModalCreateEpisode
                    setShowModal={setShowModalEpisodes}
                    itemID={itemID}
                />
            }

            <div className={containerMain()}>
                <h1 className={titleText()}>
                    {title}
                </h1>

                <button className={button()} onClick={() => setShowModalCreate(true)}>
                    <span className={buttonText()}>
                        ADICIONAR
                    </span>

                    <PlusCircle className={icon()} size={16} color='#fff' />
                </button>
            </div>
            <div className={containerData()}>
                <div className='w-full'>
                    {!data || data.length === 0 && (
                        <span className={itemSpan()}>
                            <h2 className={itemText()}>
                                Nenhum dado para ser mostrado aqui...
                            </h2>
                        </span>
                    )}

                    {data.map((item, index) => (
                        <span key={index} className={itemSpan()}>
                            <h2 className={itemText()}>
                                {type !== 'Tag' ? item.title : item}
                            </h2>

                            <div className='
                                flex flex-row items-center gap-2
                            '>
                                {type !== 'Movie' && type !== 'Tag' &&
                                    <PlusCircle className='cursor-pointer' size={20} color='#fff' onClick={() => {
                                        setItemID(item.id)
                                        setShowModalEpisodes(true)
                                    }} />
                                }

                                {type !== 'Tag'
                                    ? <Trash className='cursor-pointer' size={20} color='#fff' onClick={() => deleteItem(item.id)} />
                                    : <Trash className='cursor-pointer' size={20} color='#fff' onClick={() => deleteItem(item)} />
                                }
                            </div>
                        </span>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DashboardTable;