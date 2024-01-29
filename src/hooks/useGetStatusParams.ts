export const useGetStatusParams = () => {
    const handleGetStatusParams = (status, string) => {
        if (status === 'ORDERED') return { name: string?.ordered, color: '#1E90FF' };
        if (status === 'PROCESSED') return { name: string?.processed, color: 'green' };
        if (status === 'DELIVERED') return { name: string?.delivered, color: 'orange' };
        if (status === 'REFUNDED') return { name: string?.refunded, color: 'grey' };
        if (status === 'CANCELED') return { name: string?.canceled, color: 'red' };
    };

    return { handleGetStatusParams };
};
