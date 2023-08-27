import { useEffect, useState } from 'react'

const useImage = (fileName, path, imgtype) => {
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await import(`../${path}/${fileName}.${imgtype}`);
                setImage(response.default);
            } catch (err) {
                setError(true);
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchImage()
    }, [fileName])

    return {
        loading,
        image,
        error,
    }
}

export default useImage