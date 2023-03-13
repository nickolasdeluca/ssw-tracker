"use client";

import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Tracker() {
  const [header, setHeader] = useState([]);
  const [tracking, setTracking] = useState([]);

  useEffect(() => {
    requestTrackingData();
  }, []);

  const requestTrackingData = async () => {
    try {
      const response = await fetch(`https://ssw.inf.br/api/trackingdanfe`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chave_nfe: "32230305570714000825550010172121951810614604",
        }),
      });

      const data = await response.json();
      const header = data.documento.header;
      const tracking = data.documento.tracking;

      console.log(header);
      console.log(tracking);

      setHeader(header);
      setTracking(tracking);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>SSW Tracking</h1>
      <main className={styles.main}>
        <button onClick={requestTrackingData}>Rastrear</button>
      </main>
      <div>
        {header.remetente} | {header.destinatario} | {header.nro_nf} |{" "}
        {header.pedido}
      </div>
      <table>
        <tr>
          <th>cidade</th>
          <th>data_hora</th>
          <th>data_hora_efetiva</th>
          <th>descricao</th>
          <th>dominio</th>
          <th>nome_recebedor</th>
          <th>ocorrencia</th>
          <th>tipo</th>
        </tr>
        {tracking.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.cidade}</td>
              <td>{item.data_hora}</td>
              <td>{item.data_hora_efetiva}</td>
              <td>{item.descricao}</td>
              <td>{item.dominio}</td>
              <td>{item.nome_recebedor}</td>
              <td>{item.ocorrencia}</td>
              <td>{item.tipo}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
