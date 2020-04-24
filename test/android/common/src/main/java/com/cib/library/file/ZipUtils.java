package com.cib.library.file;

import android.util.Log;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Enumeration;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import de.innosystec.unrar.Archive;
import de.innosystec.unrar.NativeStorage;
import de.innosystec.unrar.rarfile.FileHeader;

//import de.innosystec.unrar.Archive;
//import de.innosystec.unrar.rarfile.FileHeader;

/**
 * 文件压缩解压缩工具类
 *
 * @author
 * @version 1.0.0
 * @create 2019/5/27
 */
public class ZipUtils {
    private static final int BUFFER_LEN = 8192;

    private ZipUtils() {
        throw new UnsupportedOperationException("u can't instantiate me...");
    }

    public static boolean zipFiles(final Collection<String> srcFiles,
                                   final String zipFilePath)
            throws IOException {
        return zipFiles(srcFiles, zipFilePath, null);
    }


    public static boolean zipFiles(final Collection<String> srcFilePaths,
                                   final String zipFilePath,
                                   final String comment)
            throws IOException {
        if (srcFilePaths == null || zipFilePath == null) return false;
        ZipOutputStream zos = null;
        try {
            zos = new ZipOutputStream(new FileOutputStream(zipFilePath));
            for (String srcFile : srcFilePaths) {
                if (!zipFile(getFileByPath(srcFile), "", zos, comment)) return false;
            }
            return true;
        } finally {
            if (zos != null) {
                zos.finish();
                zos.close();
            }
        }
    }


    public static boolean zipFiles(final Collection<File> srcFiles, final File zipFile)
            throws IOException {
        return zipFiles(srcFiles, zipFile, null);
    }


    public static boolean zipFiles(final Collection<File> srcFiles,
                                   final File zipFile,
                                   final String comment)
            throws IOException {
        if (srcFiles == null || zipFile == null) return false;
        ZipOutputStream zos = null;
        try {
            zos = new ZipOutputStream(new FileOutputStream(zipFile));
            for (File srcFile : srcFiles) {
                if (!zipFile(srcFile, "", zos, comment)) return false;
            }
            return true;
        } finally {
            if (zos != null) {
                zos.finish();
                zos.close();
            }
        }
    }


    public static boolean zipFile(final String srcFilePath,
                                  final String zipFilePath)
            throws IOException {
        return zipFile(getFileByPath(srcFilePath), getFileByPath(zipFilePath), null);
    }

    public static boolean zipFile(final String srcFilePath,
                                  final String zipFilePath,
                                  final String comment)
            throws IOException {
        return zipFile(getFileByPath(srcFilePath), getFileByPath(zipFilePath), comment);
    }


    public static boolean zipFile(final File srcFile,
                                  final File zipFile)
            throws IOException {
        return zipFile(srcFile, zipFile, null);
    }


    public static boolean zipFile(final File srcFile,
                                  final File zipFile,
                                  final String comment)
            throws IOException {
        if (srcFile == null || zipFile == null) return false;
        ZipOutputStream zos = null;
        try {
            zos = new ZipOutputStream(new FileOutputStream(zipFile));
            return zipFile(srcFile, "", zos, comment);
        } finally {
            if (zos != null) {
                zos.close();
            }
        }
    }

    private static boolean zipFile(final File srcFile,
                                   String rootPath,
                                   final ZipOutputStream zos,
                                   final String comment)
            throws IOException {
        rootPath = rootPath + (isSpace(rootPath) ? "" : File.separator) + srcFile.getName();
        if (srcFile.isDirectory()) {
            File[] fileList = srcFile.listFiles();
            if (fileList == null || fileList.length <= 0) {
                ZipEntry entry = new ZipEntry(rootPath + '/');
                entry.setComment(comment);
                zos.putNextEntry(entry);
                zos.closeEntry();
            } else {
                for (File file : fileList) {
                    if (!zipFile(file, rootPath, zos, comment)) return false;
                }
            }
        } else {
            InputStream is = null;
            try {
                is = new BufferedInputStream(new FileInputStream(srcFile));
                ZipEntry entry = new ZipEntry(rootPath);
                entry.setComment(comment);
                zos.putNextEntry(entry);
                byte buffer[] = new byte[BUFFER_LEN];
                int len;
                while ((len = is.read(buffer, 0, BUFFER_LEN)) != -1) {
                    zos.write(buffer, 0, len);
                }
                zos.closeEntry();
            } finally {
                if (is != null) {
                    is.close();
                }
            }
        }
        return true;
    }

    public static List<File> unzipFile(final String zipFilePath,
                                       final String destDirPath)
            throws IOException {
        return unzipFileByKeyword(zipFilePath, destDirPath, null);
    }


    public static List<File> unzipFile(final File zipFile,
                                       final File destDir)
            throws IOException {
        return unzipFileByKeyword(zipFile, destDir, null);
    }


    public static List<File> unzipFileByKeyword(final String zipFilePath,
                                                final String destDirPath,
                                                final String keyword)
            throws IOException {
        return unzipFileByKeyword(getFileByPath(zipFilePath), getFileByPath(destDirPath), keyword);
    }


    public static List<File> unzipFileByKeyword(final File zipFile,
                                                final File destDir,
                                                final String keyword)
            throws IOException {
        if (zipFile == null || destDir == null) return null;
        List<File> files = new ArrayList<>();
        ZipFile zip = new ZipFile(zipFile);
        Enumeration<?> entries = zip.entries();
        try {
            if (isSpace(keyword)) {
                while (entries.hasMoreElements()) {
                    ZipEntry entry = ((ZipEntry) entries.nextElement());
                    String entryName = entry.getName();
                    if (entryName.contains("../")) {
                        Log.e("ZipUtils", "entryName: " + entryName + " is dangerous!");
                        continue;
                    }
                    if (!unzipChildFile(destDir, files, zip, entry, entryName)) return files;
                }
            } else {
                while (entries.hasMoreElements()) {
                    ZipEntry entry = ((ZipEntry) entries.nextElement());
                    String entryName = entry.getName();
                    if (entryName.contains("../")) {
                        Log.e("ZipUtils", "entryName: " + entryName + " is dangerous!");
                        continue;
                    }
                    if (entryName.contains(keyword)) {
                        if (!unzipChildFile(destDir, files, zip, entry, entryName)) return files;
                    }
                }
            }
        } finally {
            zip.close();
        }
        return files;
    }

    private static boolean unzipChildFile(final File destDir,
                                          final List<File> files,
                                          final ZipFile zip,
                                          final ZipEntry entry,
                                          final String name) throws IOException {
        File file = new File(destDir, name);
        files.add(file);
        if (entry.isDirectory()) {
            return createOrExistsDir(file);
        } else {
            if (!createOrExistsFile(file)) return false;
            InputStream in = null;
            OutputStream out = null;
            try {
                in = new BufferedInputStream(zip.getInputStream(entry));
                out = new BufferedOutputStream(new FileOutputStream(file));
                byte buffer[] = new byte[BUFFER_LEN];
                int len;
                while ((len = in.read(buffer)) != -1) {
                    out.write(buffer, 0, len);
                }
            } finally {
                if (in != null) {
                    in.close();
                }
                if (out != null) {
                    out.close();
                }
            }
        }
        return true;
    }

    /**
     * Return the files' path in ZIP file.
     *
     * @param zipFilePath The path of ZIP file.
     * @return the files' path in ZIP file
     * @throws IOException if an I/O error has occurred
     */
    public static List<String> getFilesPath(final String zipFilePath)
            throws IOException {
        return getFilesPath(getFileByPath(zipFilePath));
    }


    public static List<String> getFilesPath(final File zipFile)
            throws IOException {
        if (zipFile == null) return null;
        List<String> paths = new ArrayList<>();
        ZipFile zip = new ZipFile(zipFile);
        Enumeration<?> entries = zip.entries();
        while (entries.hasMoreElements()) {
            String entryName = ((ZipEntry) entries.nextElement()).getName();
            if (entryName.contains("../")) {
                Log.e("ZipUtils", "entryName: " + entryName + " is dangerous!");
                paths.add(entryName);
            } else {
                paths.add(entryName);
            }
        }
        zip.close();
        return paths;
    }

    public static List<String> getComments(final String zipFilePath)
            throws IOException {
        return getComments(getFileByPath(zipFilePath));
    }

    public static List<String> getComments(final File zipFile)
            throws IOException {
        if (zipFile == null) return null;
        List<String> comments = new ArrayList<>();
        ZipFile zip = new ZipFile(zipFile);
        Enumeration<?> entries = zip.entries();
        while (entries.hasMoreElements()) {
            ZipEntry entry = ((ZipEntry) entries.nextElement());
            comments.add(entry.getComment());
        }
        zip.close();
        return comments;
    }

    private static boolean createOrExistsDir(final File file) {
        return file != null && (file.exists() ? file.isDirectory() : file.mkdirs());
    }

    private static boolean createOrExistsFile(final File file) {
        if (file == null) return false;
        if (file.exists()) return file.isFile();
        if (!createOrExistsDir(file.getParentFile())) return false;
        try {
            return file.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    private static File getFileByPath(final String filePath) {
        return isSpace(filePath) ? null : new File(filePath);
    }

    private static boolean isSpace(final String s) {
        if (s == null) return true;
        for (int i = 0, len = s.length(); i < len; ++i) {
            if (!Character.isWhitespace(s.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    public static String ZipFolder(String zipFilePath, String outZipString) throws Exception {
        //create ZIP
        ZipOutputStream zipOutputStream = new ZipOutputStream(new FileOutputStream(outZipString));
        //create the file
        File file = new File(zipFilePath);
        //compress
        ZipFiles(file.getParent() + File.separator, file.getName(), zipOutputStream);
        //finish and close
        zipOutputStream.finish();
        zipOutputStream.close();
        return outZipString;
    }

    /**
     * compress files
     *
     * @param folderString
     * @param fileString
     * @param zipOutputSteam
     * @throws Exception
     */
    private static void ZipFiles(String folderString, String fileString, ZipOutputStream zipOutputSteam) throws Exception {
        if (zipOutputSteam == null)
            return;
        File file = new File(folderString + fileString);
        if (file.isFile()) {
            ZipEntry zipEntry = new ZipEntry(fileString);
            FileInputStream inputStream = new FileInputStream(file);
            zipOutputSteam.putNextEntry(zipEntry);
            int len;
            byte[] buffer = new byte[4096];
            while ((len = inputStream.read(buffer)) != -1) {
                zipOutputSteam.write(buffer, 0, len);
            }
            zipOutputSteam.closeEntry();
        } else {
            //folder
            String fileList[] = file.list();
            //no child file and compress
            if (fileList.length <= 0) {
                ZipEntry zipEntry = new ZipEntry(fileString + File.separator);
                zipOutputSteam.putNextEntry(zipEntry);
                zipOutputSteam.closeEntry();
            }
            //child files and recursion
            for (int i = 0; i < fileList.length; i++) {
                ZipFiles(folderString, fileString + File.separator + fileList[i], zipOutputSteam);
            }//end of for
        }
    }

    /**
     * DeCompress the ZIP to the path
     *
     * @param zipFileString name of ZIP
     * @param outPathString path to be unZIP
     * @throws Exception
     */
    public static String UnZipFolder(String zipFileString, String outPathString) throws Exception {
        // check file exists
        File zipFile = new File(zipFileString);
        if (zipFileString.endsWith(".rar")) {
            return UnRarFolder(zipFileString, outPathString);
        }
        if (!zipFile.exists())
            throw new IOException("file not exists");
//        outPathString += File.separator + zipFile.getName().substring(0, zipFile.getName().lastIndexOf("."));
        // create zip input
        ZipInputStream zipInputStream = new ZipInputStream(new FileInputStream(zipFile));
        ZipEntry zipEntry;
        String zipPathName = "";
        // zip
        while ((zipEntry = zipInputStream.getNextEntry()) != null) {
            zipPathName = zipEntry.getName();
            if (zipPathName.contains("../")){
                throw new Exception("发现不安全的zip文件解压路径！");
            }
            if (zipEntry.isDirectory()) {
                File folder = new File(outPathString + File.separator + zipPathName);
                if (!folder.exists())
                    folder.mkdirs();
            } else {
                File file = new File(outPathString + File.separator + zipPathName);
                File pFile = file.getParentFile();
                if (!pFile.exists()) {
                    pFile.mkdirs();
                }
                file.createNewFile();
                // outPut file
                FileOutputStream out = new FileOutputStream(file);
                int len;
                byte[] buffer = new byte[1024];
                while ((len = zipInputStream.read(buffer)) != -1) {
                    out.write(buffer, 0, len);
                    out.flush();
                }
                out.close();
            }
        }
        // finish
        zipInputStream.close();
        return outPathString;
    }

    public static String UnRarFolder(String zipFileString, String outPathString) {
        Log.d("start unRar", System.currentTimeMillis() + "");
        File srcFile = new File(zipFileString);
        if (null == outPathString || "".equals(outPathString)) {
            outPathString = srcFile.getParentFile().getPath();
        }
        // 保证文件夹路径最后是"/"或者"\"
        char lastChar = outPathString.charAt(outPathString.length() - 1);
        if (lastChar != '/' && lastChar != '\\') {
            outPathString += File.separator;
        }
//        Log.d(TAG, "unrar file to :" + outPathString);


        FileOutputStream fileOut = null;
        Archive rarfile = null;
        NativeStorage nativeStorage = null;

        try {
            nativeStorage = new NativeStorage(srcFile);
            rarfile = new Archive(nativeStorage);
            FileHeader fh = null;
            final int total = rarfile.getFileHeaders().size();
            for (int i = 0; i < rarfile.getFileHeaders().size(); i++) {
                fh = rarfile.getFileHeaders().get(i);
                String entrypath = "";
                if (fh.isUnicode()) {//解決中文乱码
                    entrypath = fh.getFileNameW().trim();
                } else {
                    entrypath = fh.getFileNameString().trim();
                }
                entrypath = entrypath.replaceAll("\\\\", "/");

                File file = new File(outPathString, entrypath);

                if (fh.isDirectory()) {
                    file.mkdirs();
                } else {
                    File parent = file.getParentFile();
                    if (parent != null && !parent.exists()) {
                        parent.mkdirs();
                    }
                    fileOut = new FileOutputStream(file);
                    rarfile.extractFile(fh, fileOut);
                    fileOut.close();
                }
            }
            rarfile.close();


        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (fileOut != null) {
                try {
                    fileOut.close();
                    fileOut = null;
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (rarfile != null) {
                try {
                    rarfile.close();
                    rarfile = null;
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        Log.d("finish unRar", System.currentTimeMillis() + "");
        return outPathString;
    }
}
