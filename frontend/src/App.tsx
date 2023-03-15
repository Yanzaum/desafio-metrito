import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { FiEye } from "react-icons/fi";
import { SaleType } from "./types/Sales";

export const formatDate = (miliseconds: number) => {
  return new Date(miliseconds).toLocaleDateString();
};

export default function App() {
  const [data, setData] = useState<SaleType[]>();
  const [totalItems, setTotalItems] = useState(0);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SaleType>();
  const API = import.meta.env.VITE_API;

  const fetchData = async () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      return axios
        .post(`${API}/vendas`, {
          token,
        })
        .then((response) => {
          const { items, page_info } = response.data.data;
          setData(items);
          setTotalItems(page_info.total_results);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    } else {
      return axios.get(`${API}/autenticar`).then((response) => {
        const token: string = response.data.token;
        sessionStorage.setItem("token", token);
        setToken(token);
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleItemModal = (item: SaleType) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        item={selectedItem}
      />
      <div className="text-white container mx-auto py-10">
        <h1 className="text-center text-2xl font-bold">🔥 Vendas Hotmart 🔥</h1>
        <p className="text-center">
          Abaixo estará listado todas as vendas feitas entre o dia 01/04/2021 e
          30/05/2021
        </p>
        <div className="mt-10">
          {loading && <div>Carregando...</div>}
          {error && (
            <div>{`Ocorreu um problema ao buscar os dados das vendas - ${error}`}</div>
          )}
          <ul className="grid lg:grid-cols-3 gap-5">
            {data &&
              data.map((item, key) => (
                <li
                  className="bg-black border border-gray-800 p-2 rounded-lg"
                  key={key}
                >
                  <div className="flex items-center justify-end">
                    <button
                      className="bg-white text-black font-bold p-1 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => handleItemModal(item)}
                    >
                      <FiEye />
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <p>
                      <strong>Transação:</strong>{" "}
                      {item["purchase"]?.transaction}
                    </p>
                    <p>
                      <strong>Produto:</strong> {item["product"]?.name}
                    </p>
                    <p>
                      <strong>Produtor:</strong>{" "}
                      {item["producer"]?.name ? item["producer"]?.name : "null"}
                    </p>
                    <p>
                      <strong>Comprador:</strong>{" "}
                      {item["buyer"]?.name ? item["buyer"]?.name : "null"}
                    </p>
                    <div>
                      <div>
                        <strong>Dados da compra: </strong>
                        {item["purchase"]?.price.value.toString()}{" "}
                        {item["purchase"]?.price.currency_code}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-end text-xs">
                    {formatDate(item["purchase"]?.order_date)}
                  </div>
                </li>
              ))}
          </ul>
          {data && (
            <p className="flex flex-col items-center justify-center mt-5 text-2xl">
              Total de vendas: <strong>{totalItems}</strong>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
