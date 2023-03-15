import { formatDate } from "./App";
import { SaleType } from "./types/Sales";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  item: SaleType | undefined;
}

export default function Modal({ showModal, setShowModal, item }: Props) {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Mais informações</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-red-600 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-red-600 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {item && (
                  <div className="relative p-6 flex-auto">
                    <div className="my-4 text-slate-900 leading-relaxed">
                      <div className="flex flex-col">
                        <p>
                          <strong>Produto:</strong> {item["product"]?.name}
                        </p>
                        <p>
                          <strong>Produtor:</strong>{" "}
                          {item["producer"]?.name
                            ? item["producer"]?.name
                            : "null"}
                        </p>
                        <p>
                          <strong>Comprador:</strong>{" "}
                          {item["buyer"]?.name ? item["buyer"]?.name : "null"}(
                          {item["buyer"]?.email ? item["buyer"]?.email : "null"}
                          )
                        </p>
                        <div>
                          <p>
                            <strong>Dados da compra:</strong>
                          </p>
                          <div className="flex flex-col">
                            <p>{item["purchase"]?.transaction}</p>
                            <p>{item["purchase"]?.payment.method}</p>
                            <p>
                              {item["purchase"]?.price.value.toString()}{" "}
                              {item["purchase"]?.price.currency_code}
                            </p>
                          </div>
                        </div>
                        <div>
                          <strong>Taxa hotmart:</strong>{" "}
                          {item["purchase"]?.hotmart_fee.total
                            ? item["purchase"]?.hotmart_fee.total.toString()
                            : "null"}
                          {item["purchase"]?.hotmart_fee.currency_code
                            ? item["purchase"]?.hotmart_fee.currency_code
                            : "null"}
                        </div>
                      </div>
                      <div className="flex items-end justify-end text-xs">
                        {formatDate(item["purchase"]?.order_date)}
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
