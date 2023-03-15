import axios from "axios";
import { Request, Response } from "express";
import { SaleType } from "../types/Sales";

require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const TOKEN = process.env.TOKEN;

export const authentication = async (req: Request, res: Response) => {
  axios
    .post(
      `https://api-sec-vlc.hotmart.com/security/oauth/token?grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
      {},
      {
        headers: {
          Authorization: `Basic ${TOKEN}`,
        },
      }
    )
    .then((response) => {
      return res.status(200).json({
        token: response.data.access_token,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(404).json({ error: "Erro ao autenticar" });
    });
};

export const allSales = async (req: Request, res: Response) => {
  const START_DATE = "1617235200000";
  const END_DATE = "1622332800000";

  let sales: SaleType[] = [];

  await axios
    .get(
      `https://developers.hotmart.com/payments/api/v1/sales/history?transaction_status=COMPLETE&start_date=${START_DATE}&end_date=${END_DATE}`,
      {
        headers: {
          Authorization: `Bearer ${req.body.token}`,
        },
      }
    )
    .then((response) => {
      sales = response.data;
    })
    .catch((error) => {
      if (error)
        return res.status(404).json({ error: "Erro ao recuperar os dados" });
    });

  if (!sales || sales.length == 0) {
    return res.status(404).json({ error: "Erro ao recuperar as vendas" });
  }

  return res.status(200).json({
    data: sales,
  });
};
