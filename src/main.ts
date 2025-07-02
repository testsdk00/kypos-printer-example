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

// const orderData = {
//   orderNo: '20240612-001',
//   time: '2024-06-12 15:00',
//   items: [
//     { name: '핫도그', qty: 2, price: 1500 },
//     { name: '아이스커피', qty: 1, price: 1800 },
//     { name: '콜라', qty: 3, price: 1000 },
//   ],
//   total: 7800,
//   payment: '카드결제',
// };
// function padText(text: string, length: number): string {
//   let textLength = 0;
//   for (let ch of text) {
//     textLength += /[ㄱ-ㅎ가-힣]/.test(ch) ? 2 : 1;
//   }
//   // 초과시 잘라줌
//   let result = text;
//   while (textLength > length && result.length > 0) {
//     // 오른쪽 마지막 글자 잘라내기
//     const lastChar = result[result.length - 1];
//     textLength -= /[ㄱ-ㅎ가-힣]/.test(lastChar) ? 2 : 1;
//     result = result.slice(0, -1);
//   }
//   return result + ' '.repeat(Math.max(0, length - textLength));
// }
// // 출력 함수
// device.open(function (error) {
//   if (error) {
//     console.error('프린터 연결 오류:', error);
//     return;
//   }
//   printer.encode('EUC-KR');
//   printer
//     .align('CT')
//     .size(2, 2)
//     .text('주문서')
//     .size(1, 1)
//     .text('-'.repeat(LINE_WIDTH))
//     .align('LT')
//     .text(`주문번호: ${orderData.orderNo}`)
//     .text(`시간:     ${orderData.time}`)
//     .text('-'.repeat(LINE_WIDTH))
//     .text(
//       padText('상품명', NAME_COL) +
//         padText('수', QTY_COL) +
//         padText('금액', PRICE_COL),
//     )
//     .text('-'.repeat(LINE_WIDTH));

//   orderData.items.forEach((item) => {
//     const name = padText(item.name, NAME_COL);
//     const qty = padText(item.qty.toString(), QTY_COL);
//     const price = padText(item.price.toString(), PRICE_COL);
//     printer.text(name + qty + price);
//   });

//   printer
//     .text('-'.repeat(LINE_WIDTH))
//     .align('RT')
//     .text(`합계 : ${orderData.total} 원`)
//     .text(`결제 : ${orderData.payment}`)
//     .align('CT')
//     .text('감사합니다!')
//     .cut()
//     .close();
// });



import { Printer } from '@node-escpos/core'
import Serial from '@node-escpos/serialport-adapter'

const device = new Serial('COM3', {
  baudRate: 115200,
  autoOpen: true,
});
device.open(async function(err){
  if(err){
    // handle error
    return
  }
  printer.text('Hello, world!').cut().close();
})
const printer = new Printer(device, {
  encoding: 'GB18030',
});
