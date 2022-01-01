import ipfs from "../config/ipfs";

export const addIpfs = async (img,name, description) => {
  try {
    const cid = await ipfs.add(img.src);
    const source = await ipfs.add(
      {
        path: "metadata.json",
        content: JSON.stringify({
          name: `NFT-${name}`,
          description: description,
          image: `https://ipfs.io/ipfs/${cid.path}`,
        }),
      },
      {
        wrapWithDirectory: true,
      }
    );
    return { cid, source };
  } catch (err) {
    throw new Error("Something went wrong,Pls submit form again");
  }
};
