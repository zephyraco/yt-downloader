export const getVideoInfo = async (
  url,
  setShowInput,
  setVideoInfo,
  setLoading,
  setError
) => {
  if (!url) {
    return;
  }
  setLoading(true);
  setError(false);
  setShowInput(false);
  try {
    const response = await fetch(
      `http://localhost:5050/get-info?url=${encodeURIComponent(url)}`
    );
    const data = await response.json();
    setVideoInfo(data);
  } catch (error) {
    setError(true);
  } finally {
    setLoading(false);
  }
};

export const downloadVideo = async (url, format, quality, setLoading, setError) => {
    try {
        setLoading(true);
        const params = new URLSearchParams({
            url: encodeURI(url),
            format,
            quality,
        });

        const response = await fetch(`http://localhost:5050/download?${params}`);
        if (!response.ok) {
            throw new Error('Failed to download video');
        }

        const contentDisposition = response.headers.get('Content-Disposition');
        const fileNameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
        const fileName = fileNameMatch ? fileNameMatch[1] : 'downloaded-video';

        setLoading(false);
        const blob = await response.blob();

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
    } catch (error) {
        setLoading(false);
        setError(true);
        console.error('Error downloading video:', error);
    }
};
