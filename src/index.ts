import readline from 'readline';
import { MapGrid } from 'blockrpg-core/built/Model/MapBlock/Entity/MapGrid';
import { MapBlock } from 'blockrpg-core/built/Model/MapBlock/Entity/index';
import * as MapBlockBLL from 'blockrpg-core/built/Model/MapBlock/BLL';

const iReadLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ReadLine(ques: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    iReadLine.question(ques, (answer) => {
      resolve(answer);
    });
  });
}

function Random(num: number) {
  return Math.floor(Math.random() * (Math.floor(Math.abs(num)) + 1)) === 0;
}

async function initMap(num: number) {
  for (let i = -num; i <= num; ++i) {
    for (let j = -num; j <= num; ++j) {
      // 随机初始化网格
      const grids = Array(21 * 13).fill(0).map((num) => {
        return new MapGrid({
          // 草地地图
          map: {
            resId: 0,
            resNum: 1,
          },
          // 灌木道具
          prop: Random(20) ? {
            resId: 0,
            resNum: 10,
            passMask: 0,
          } : undefined,
        })
      });
      const block = new MapBlock({
        id: undefined,
        mapId: 'test',
        x: j,
        y: i,
        grids,
      });
      console.log(`${i}~${j} building...`);
      await MapBlockBLL.newBlock(block);
    }
  }
}

async function main() {
  console.log('------map init------');
  const numStr = await ReadLine('input number: ');
  const num = Number(numStr);
  if (isFinite(num) && num >= 1) {
    const padNum = Math.floor(num);
    await initMap(padNum);
    console.log('finished');
  } else {
    console.error('number error');
  }
  iReadLine.close();
  process.exit(0);
}

main();
