import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import StrictModeDroppable from './StrictModeDroppable';
import Image from 'components/atoms/Media/Image';
import toast from 'react-hot-toast';
import EmptyImageInput from 'components/atoms/Media/EmptyImageInput';
import { useOutletContext, useParams } from 'react-router-dom';
import EmptyVideoInput from 'components/atoms/Media/EmptyVideoInput';
import Video from 'components/atoms/Media/Video';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const ImageCards = ({ data, setImageOrder, variationGroupId, deleteFile, updateVariants, addMedia }) => {
    const { productId } = useParams();
    const { string }: any = useOutletContext();
    const [images, setImages] = useState<any>([]);
    const [imageSlots, setImageSlots] = useState<any>([]);
    const [video, setVideo] = useState<any>([]);
    const [videoSlots, setVideoSlots] = useState<any>([]);

    const imageQuota = 5;
    const videoQuota = 1;

    useEffect(() => {
        const imageData = data.filter(el => !el.imageName.includes('mp4'));
        setImages(imageData);
        if (imageData.length > imageQuota) {
            setImageSlots([]);
        } else {
            const slotsArray = [...Array(imageQuota)].map((el, sIdx) => {
                if (imageData.find((el, iIdx) => sIdx === iIdx)) return null;
                return sIdx + 1;
            });
            setImageSlots(slotsArray);
        }

        const videoData = data.filter(el => el.imageName.includes('mp4'));
        setVideo(videoData);
        if (videoData.length > videoQuota) {
            setVideoSlots([]);
        } else {
            const slotsVideoArray = [...Array(videoQuota)].map((el, sIdx) => {
                if (videoData.find((el, iIdx) => sIdx === iIdx)) return null;
                return sIdx + 1;
            });
            setVideoSlots(slotsVideoArray);
        }
    }, [data]);

    const onDragEnd = result => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const orderedImages = reorder(images, result.source.index, result.destination.index);

        // update the kitchen area order depending on the drag and drop order
        const updatedImages = orderedImages.map((images: any, index: number) => ({
            ...images,
            order: index + 1,
        }));
        setImages(updatedImages);

        setImageOrder({ variationGroupId, imageId: result.draggableId, order: result.destination.index });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                overflow: 'auto',
                border: '1px solid #ccc',
                borderTop: 'none',
                minWidth: '100%',
                gap: 0.5,
                p: 0.5,
            }}
        >
            {!!images.length && (
                <DragDropContext onDragEnd={onDragEnd}>
                    <StrictModeDroppable droppableId="droppableId" direction={'horizontal'}>
                        {provided => (
                            <Box
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                sx={{
                                    display: 'flex',
                                    minWidth: `${images.length * 200 + 3 * images.length}px`,
                                    gap: 0.5,
                                }}
                            >
                                {images.map((image, index) => {
                                    if (image) {
                                        return (
                                            <Draggable
                                                key={image?.id?.toString()}
                                                draggableId={image?.id?.toString()}
                                                index={index}
                                            >
                                                {provided => (
                                                    <Box
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            ...provided.draggableProps.style,
                                                            minWidth: '200px',
                                                            width: '200px',
                                                            borderRadius: 4,
                                                            overflow: 'hidden',
                                                            border: '1px solid #ccc',
                                                        }}
                                                    >
                                                        <Image
                                                            height={9}
                                                            width={6}
                                                            imgUrl={image?.imageUrl}
                                                            isDrag
                                                            isRemovable
                                                            deleteAction={() =>
                                                                deleteFile({ variationGroupId, imageId: image?.id })
                                                                    .then(_res => {
                                                                        updateVariants();
                                                                    })
                                                                    .catch(err => {
                                                                        console.log(err);
                                                                        toast.error(err.message);
                                                                    })
                                                            }
                                                        />
                                                    </Box>
                                                )}
                                            </Draggable>
                                        );
                                    }
                                })}
                            </Box>
                        )}
                    </StrictModeDroppable>
                </DragDropContext>
            )}

            {!!imageSlots.length && (
                <Box
                    sx={{
                        display: 'flex',
                        gap: 0.5,
                    }}
                >
                    {imageSlots.map(slot => {
                        if (slot) {
                            return (
                                <Box
                                    key={slot}
                                    style={{
                                        minWidth: '200px',
                                        width: '200px',
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        border: '1px solid #ccc',
                                    }}
                                >
                                    <EmptyImageInput
                                        height={9}
                                        width={6}
                                        title={`${string?.image} ${slot}`}
                                        addAction={val => {
                                            addMedia({ variationGroupId, mediaFile: val })
                                                .then(() => {
                                                    updateVariants();
                                                })
                                                .catch(err => {
                                                    console.log(err);
                                                    toast.error(err.message);
                                                });
                                        }}
                                    />
                                </Box>
                            );
                        }
                    })}
                </Box>
            )}
            {!!video.length && (
                <Box
                    sx={{
                        display: 'flex',
                        gap: 0.5,
                    }}
                >
                    {video.map(image => {
                        if (image) {
                            return (
                                <Box
                                    key={image?.id}
                                    style={{
                                        minWidth: '200px',
                                        width: '200px',
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        border: '1px solid #ccc',
                                    }}
                                >
                                    <Video
                                        height={9}
                                        width={6}
                                        imgUrl={image?.imageUrl}
                                        isRemovable
                                        deleteAction={() =>
                                            deleteFile({ variationGroupId, imageId: image?.id })
                                                .then(_res => {
                                                    updateVariants();
                                                })
                                                .catch(err => {
                                                    console.log(err);
                                                    toast.error(err.message);
                                                })
                                        }
                                    />
                                </Box>
                            );
                        }
                    })}
                </Box>
            )}
            {!!videoSlots.length && (
                <Box
                    sx={{
                        display: 'flex',
                        gap: 0.5,
                    }}
                >
                    {videoSlots.map(slot => {
                        if (slot) {
                            return (
                                <Box
                                    key={slot}
                                    style={{
                                        minWidth: '200px',
                                        width: '200px',
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        border: '1px solid #ccc',
                                    }}
                                >
                                    <EmptyVideoInput
                                        height={9}
                                        width={6}
                                        title={`${string?.video} ${slot}`}
                                        addAction={val => {
                                            addMedia({ variationGroupId, mediaFile: val })
                                                .then(() => {
                                                    updateVariants();
                                                })
                                                .catch(err => {
                                                    console.log(err);
                                                    toast.error(err.message);
                                                });
                                        }}
                                    />
                                </Box>
                            );
                        }
                    })}
                </Box>
            )}
        </Box>
    );
};

export default ImageCards;
