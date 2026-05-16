# Google Sheets 연동 설정 가이드

## 1단계 — Google Sheets 생성

1. [Google Sheets](https://sheets.google.com) 접속 → 새 스프레드시트 생성
2. 시트 이름: `신청접수`
3. 1행에 헤더 입력:
   ```
   A1: 신청일시  B1: 상품  C1: 금액  D1: 이름  E1: 성별
   F1: 생년월일  G1: 출생시각  H1: 출생지  I1: 이메일  J1: 전화번호
   ```

## 2단계 — Apps Script 웹훅 생성

1. 스프레드시트 상단 메뉴 → **확장 프로그램 → Apps Script**
2. 기존 코드 전체 삭제 후 아래 코드 붙여넣기:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("신청접수");
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.신청일시,
    data.상품,
    data.금액,
    data.이름,
    data.성별,
    data.생년월일,
    data.출생시각,
    data.출생지,
    data.이메일,
    data.전화번호,
  ]);

  // 이메일 알림 (선택사항 — 본인 Gmail 주소로 변경)
  // MailApp.sendEmail("your@gmail.com", "[명언사주] 새 신청 접수", `이름: ${data.이름}\n상품: ${data.상품}\n이메일: ${data.이메일}`);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. 저장 (Ctrl+S) → 프로젝트 이름: `명언사주 신청접수`

## 3단계 — 웹 앱으로 배포

1. 우측 상단 **배포 → 새 배포** 클릭
2. 유형: **웹 앱**
3. 설정:
   - 설명: `명언사주 신청 접수`
   - 다음 사용자로 실행: **나(본인 계정)**
   - 액세스 권한: **모든 사람**
4. **배포** 클릭 → 권한 허용
5. **웹 앱 URL** 복사 (https://script.google.com/macros/s/... 형태)

## 4단계 — Vercel 환경변수 설정

Vercel 대시보드 → 프로젝트 → Settings → Environment Variables:

| 변수명 | 값 |
|---|---|
| `VITE_SHEETS_WEBHOOK_URL` | 3단계에서 복사한 웹 앱 URL |

설정 후 **재배포** 필요.

## 이메일 알림 활성화 (선택)

Apps Script 코드에서 `MailApp.sendEmail(...)` 줄의 주석(`//`)을 제거하고
`your@gmail.com` 부분을 본인 이메일로 변경하면 신청마다 이메일 알림을 받을 수 있습니다.
