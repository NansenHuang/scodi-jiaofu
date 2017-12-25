#!/bin/sh
echo
folder="dist"
echo "输入打包好的目录名(默认为${folder})："
read input
if [ x$input != x ]; then
  folder=$input
fi
echo "输入dist/打包成zip后的文件名："
read zipname
echo

mv $folder $zipname
zip -r "${zipname}.zip" "${zipname}/" > /dev/null
mv $zipname $folder

echo '正在上传...'
scp "${zipname}.zip" deploy@ls:/home/deploy/workspace/web
echo '上传成功；'
echo

echo '正在执行远程操作...'
ssh deploy@197.70.70.30 "cd workspace/web/ ; rm -rf ${zipname}/ ; unzip ${zipname}.zip -d ./ > /dev/null ; rm ${zipname}.zip ;"
echo '发布成功。'
echo

rm "${zipname}.zip"
