// checkFile.js
var fso = new ActiveXObject("Scripting.FileSystemObject");
var folderPath = "C:\\"; // 검색할 폴더 경로

WScript.Echo("File Name : ");
var fileName = WScript.StdIn.ReadLine(); // 사용자로부터 파일 이름을 입력받는 부분

if (fileName === "") {
    WScript.Echo("Please write down a file name."); // 빈 입력 처리
} else {
    WScript.Echo("Searching for file: " + fileName); // 입력한 파일 이름 출력

    // 폴더가 존재하는지 확인
    if (fso.FolderExists(folderPath)) {
        searchFilesInFolder(folderPath); // 파일 검색 함수 호출
    } else {
        WScript.Echo("Folder path C:/ not found.");
    }
}

// 하위 폴더를 포함하여 파일 검색 함수
function searchFilesInFolder(folderPath) {
    var folder = fso.GetFolder(folderPath);
    var files = new Enumerator(folder.Files);
    var subFolders = new Enumerator(folder.SubFolders); // 하위 폴더 가져오기
    var fileFound = false;

    // 현재 폴더 내의 모든 파일을 순회
    for (; !files.atEnd(); files.moveNext()) {
        var file = files.item();
        if (file.Name === fileName) {
            WScript.Echo("File found at: " + file.Path); // 파일 경로 출력
            fileFound = true;
            break; // 파일을 찾으면 종료
        }
    }

    // 하위 폴더를 순회
    for (; !subFolders.atEnd(); subFolders.moveNext()) {
        var subFolder = subFolders.item();
        // 재귀적으로 하위 폴더 검색
        fileFound = searchFilesInFolder(subFolder.Path); 
        if (fileFound) break; // 파일이 발견되면 종료
    }

    if (!fileFound) {
        return false; // 파일을 찾지 못함
    }
    return true; // 파일을 찾음
}
