// import escpos from 'escpos';
// import escposUSB from 'escpos-usb';
// escpos.USB = escposUSB;

// const deviceInfo = escpos.USB.findPrinter();
// console.log(deviceInfo);

// const device = new escpos.USB(); //(0x2aaf, 0x6014);
// const printer = new escpos.Printer(device);

// // 프린터 열 폭 상수(폰트 A에서 21자)
// const LINE_WIDTH = 21;
// const NAME_COL = 8;
// const QTY_COL = 3;
// const PRICE_COL = 8;

// // 출력 함수
// device.open(function (error) {
//   if (error) {
//     console.error('프린터 연결 오류:', error);
//     return;
//   }
// printer.encode('EUC-KR');
// printer
//   .align('CT')
//   .size(2, 2)
//   .text('주문서')
//   .size(1, 1)
//   .text('-'.repeat(LINE_WIDTH))
//   .align('LT')
//   .text(`주문번호: ${orderData.orderNo}`)
//   .text(`시간:     ${orderData.time}`)
//   .text('-'.repeat(LINE_WIDTH))
//   .text(
//     padText('상품명', NAME_COL) +
//       padText('수', QTY_COL) +
//       padText('금액', PRICE_COL),
//   )
//   .text('-'.repeat(LINE_WIDTH));

// orderData.items.forEach((item) => {
//   const name = padText(item.name, NAME_COL);
//   const qty = padText(item.qty.toString(), QTY_COL);
//   const price = padText(item.price.toString(), PRICE_COL);
//   printer.text(name + qty + price);
// });

// printer
//   .text('-'.repeat(LINE_WIDTH))
//   .align('RT')
//   .text(`합계 : ${orderData.total} 원`)
//   .text(`결제 : ${orderData.payment}`)
//   .align('CT')
//   .text('감사합니다!')
//   .cut()
//   .close();
// });

import { Printer } from '@node-escpos/core';
import Serial from '@node-escpos/serialport-adapter';
import USB from '@node-escpos/usb-adapter';

const LINE_WIDTH = 48;
const NAME_COL = Math.floor(LINE_WIDTH * (3 / 6));
const QTY_COL = Math.floor(LINE_WIDTH * (1 / 6));
const PRICE_COL = Math.floor(LINE_WIDTH * (2 / 6));

const orderData = {
  orderNo: '20240612-001',
  time: '2024-06-12 15:00',
  items: [
    { name: '핫도그', qty: 2, price: 1500 },
    { name: '아이스커피', qty: 1, price: 1800 },
    { name: '콜라', qty: 3, price: 1000 },
  ],
  total: 7800,
  payment: '카드결제',
};
function padText(
  text: string,
  length: number,
  alignment: 'left' | 'right' | 'center' = 'left',
): string {
  let textLength = 0;
  for (const ch of text) {
    textLength += /[ㄱ-ㅎ가-힣]/.test(ch) ? 2 : 1;
  }
  // 초과시 잘라줌
  let result = text;
  while (textLength > length && result.length > 0) {
    // 오른쪽 마지막 글자 잘라내기
    const lastChar = result[result.length - 1];
    textLength -= /[ㄱ-ㅎ가-힣]/.test(lastChar) ? 2 : 1;
    result = result.slice(0, -1);
  }

  const paddingLength = Math.max(0, length - textLength);

  switch (alignment) {
    case 'right':
      return ' '.repeat(paddingLength) + result;
    case 'center': {
      const leftPadding = Math.floor(paddingLength / 2);
      const rightPadding = paddingLength - leftPadding;
      return ' '.repeat(leftPadding) + result + ' '.repeat(rightPadding);
    }
    case 'left':
    default:
      return result + ' '.repeat(paddingLength);
  }
}

// const device = new Serial('/dev/tty.usbserial-110', {
//   baudRate: 115200,
//   autoOpen: true,
// });
const device = new USB(0x0471, 0x0055);

device.open(async function (err) {
  if (err) {
    // handle error
    return;
  }
  printer
    // .encode('cp866')
    .setCharacterCodeTable(17)
    .text('Тест на кирилица.')
    //   .align('CT')
    //   .size(2, 2)
    //   .text('주문서')
    //   .size(1, 1)
    //   .drawLine()
    //   .align('LT')
    //   .text(`주문번호: ${orderData.orderNo}`)
    //   .text(`시간:     ${orderData.time}`)
    //   .drawLine()
    //   .text(
    //     padText('상품명', NAME_COL, 'left') +
    //       padText('수', QTY_COL, 'left') +
    //       padText('금액', PRICE_COL, 'right'),
    //   )
    //   .drawLine();

    // orderData.items.forEach((item) => {
    //   const name = padText(item.name, NAME_COL, 'left');
    //   const qty = padText(item.qty.toString(), QTY_COL, 'left');
    //   const price = padText(item.price.toString(), PRICE_COL, 'right');
    //   printer.text(name + qty + price);
    // });

    // printer
    //   .text('-'.repeat(LINE_WIDTH))
    //   .align('RT')
    //   .text(`합계 : ${orderData.total} 원`)
    //   .text(`결제 : ${orderData.payment}`)
    //   .align('CT')
    //   .text('감사합니다!')
    //   .cut()
    //   .close();

    // -------

    // .align('CT')
    // .style('B')
    // .size(1, 1)
    // .text('*** 카페 홍길동 ***')
    // .style('NORMAL')
    // .size(0, 0)
    // .text('123-45-67890 대표: 홍길동')
    // .text('서울시 강남구 테헤란로 123')
    // .text('전화: 02-1234-5678')
    // .drawLine()

    // .align('LT')
    // .text(`주문번호: #1001`)
    // .text(new Date().toLocaleString())
    // .drawLine()

    // .tableCustom([
    //   { text: '상품명', align: 'LEFT', width: 0.5 },
    //   { text: '수량', align: 'CENTER', width: 0.2 },
    //   { text: '금액', align: 'RIGHT', width: 0.3 },
    // ])
    // .drawLine()

    // .tableCustom([
    //   { text: '아메리카노(H)', align: 'LEFT', width: 0.5 },
    //   { text: '1', align: 'CENTER', width: 0.2 },
    //   { text: '3,000', align: 'RIGHT', width: 0.29 },
    // ])
    // .tableCustom([
    //   { text: '카페라떼(H)', align: 'LEFT', width: 0.5 },
    //   { text: '2', align: 'CENTER', width: 0.2 },
    //   { text: '6,000', align: 'RIGHT', width: 0.3 },
    // ])
    // .text('')

    // .text('합계 금액: 9,000원')
    // .text('부가세 포함')
    // .drawLine()

    // .text('[카드 승인정보]')
    // .text('카드사: 국민카드')
    // .text('카드번호: ****-****-****-1234')
    // .text('할부: 일시불')
    // .text('승인번호: 12345678')
    // .text(`승인일시: ${new Date().toLocaleString()}`)
    // .text('매입사: 국민카드')
    // .drawLine()

    // .align('CT')
    .text('감사합니다. 좋은 하루 되세요!')
    .cut()
    .close();
});
const printer = new Printer(device, {
  encoding: 'UTF-8',
});
