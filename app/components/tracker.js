"use client";

import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Tracker() {
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState([]);
  const [tracking, setTracking] = useState([]);
  const [chaveNfe, setChaveNfe] = useState("");

  const handleInputChange = (event) => {
    setChaveNfe(event.target.value);
    localStorage.setItem("chaveNfe", event.target.value);
  };

  useEffect(() => {
    const chaveNfe = localStorage.getItem("chaveNfe");
    if (chaveNfe) {
      setChaveNfe(chaveNfe);
    }
  }, []);

  const requestTrackingData = async () => {
    if (chaveNfe === "") return console.error(`Chave NFe não informada!`);

    try {
      const response = await fetch(`https://ssw.inf.br/api/trackingdanfe`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chave_nfe: chaveNfe,
        }),
      });

      const data = await response.json();

      if (data.success === false) return console.warn(data);

      const header = data.documento.header;
      const tracking = data.documento.tracking;

      console.log(header);
      console.log(tracking);

      setHeader(header);
      setTracking(tracking);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>SSW Tracking</h1>
      <form>
        <label>
          Chave NFe:
          <input
            type="text"
            name="chave_nfe"
            value={chaveNfe}
            onChange={handleInputChange}
          />
        </label>
      </form>
      <main className={styles.main}>
        <button onClick={requestTrackingData}>Rastrear</button>
      </main>
      {loading ? null : (
        <div>
          {header.remetente} | {header.destinatario} | {header.nro_nf} |{" "}
          {header.pedido}
        </div>
      )}
      {loading ? null : (
        <table>
          <tbody>
            <tr>
              <th>cidade</th>
              <th>data_hora_efetiva</th>
              <th>descricao</th>
              <th>nome_recebedor</th>
              <th>ocorrencia</th>
              <th>tipo</th>
            </tr>
            {tracking.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.cidade}</td>
                  <td>{item.data_hora_efetiva}</td>
                  <td>{item.descricao}</td>
                  <td>{item.nome_recebedor}</td>
                  <td>{item.ocorrencia}</td>
                  <td>{item.tipo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
