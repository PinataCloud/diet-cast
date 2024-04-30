import { PinataFDK } from "pinata-fdk";

export const fdk = new PinataFDK({
  pinata_jwt: process.env.PINATA_JWT as string,
  pinata_gateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
  app_fid: `${process.env.DEVELOPER_FID}`,
  app_mnemonic: `${process.env.DEVELOPER_MNEMONIC}`
});
