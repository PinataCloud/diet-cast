export async function cronFeed(channel: any, nextPage: any, pageSize: any) {
  try {
    const result = await fetch(
      `https://api.pinata.cloud/v3/farcaster/casts?channel=${channel}&pageSize=${pageSize}&pageToken=${nextPage}`,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`
        }
      });
    const resultData = await result.json();
    return resultData
  } catch (error) {
    console.log(error);
    return error;
  }
}
