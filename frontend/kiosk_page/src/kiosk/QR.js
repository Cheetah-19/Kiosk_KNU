import React from 'react';
import QR from "qrcode.react";


export default function QRCode() {
  return (
    <QR
      id="qr"
      value={"register page URL"}
      style={{ width: '100%', height: 'auto' }}
      level={"H"}
      includeMargin={false}
      fgColor={"#111111"}
    />
  );
}