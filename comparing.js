import fs from 'fs';
import similarity from 'similarity';
import * as DBmanager from './fileDb.js';

export async function compare(file) {
  const filePaths = await DBmanager.returnPaths();
  const fileToCompare = fs.readFileSync(file, 'utf8');
  const arr = [];
  let simFile;
  for (let i = 0; i < filePaths.length; i++) {
    const data = fs.readFileSync(filePaths[i].file_path, 'utf8');
    const sim = similarity(data, fileToCompare);
    if (sim >= 0.75) {
      simFile = (filePaths[i].file_name);
    }
    arr.push(sim * 100);
  }
  return [String(Math.round(largest(arr))) + '%', simFile];
}

function largest(arr) {
  let largestNum = null;
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      largestNum = arr[i];
    } else {
      if (arr[i] > largestNum) {
        largestNum = arr[i];
      }
    }
  }
  return largestNum;
}
