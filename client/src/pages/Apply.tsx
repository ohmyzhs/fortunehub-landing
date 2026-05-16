/**
 * 명언사주 신청 폼 페이지 /apply
 * 디자인: 한지·수묵화 테마 — 밝은 베이지 + 골드 + 먹 색상
 * 데이터: Google Apps Script 웹훅으로 전송 → Google Sheets 자동 저장
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

// Google Apps Script 웹훅 URL — 배포 후 실제 URL로 교체
const SHEETS_WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL || "";

const S = {
  serif: { fontFamily: "'Noto Serif KR', 'Apple Myungjo', Georgia, serif" } as React.CSSProperties,
  sans:  { fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif" } as React.CSSProperties,
  gold:  "#b8860b",
  ink:   "#1e1a14",
  muted: "#6b5e4e",
  hanji: "#f5f0e6",
};

const PRODUCTS = [
  {
    id: "basic",
    name: "기본 사주 분석",
    price: "9,900원",
    features: ["사주 원국표", "용신분석", "음양오행분석", "십신분포", "종합운세분석"],
  },
  {
    id: "premium",
    name: "정통사주 종합분석",
    price: "29,800원",
    badge: "10가지 심층 분석",
    features: [
      "기본사주분석 포함",
      "사주팔자 상세분석",
      "내 인생의 황금기",
      "연애운/배우자운",
      "재물운 및 직업/성공 운명",
      "건강운 및 생활습관 분석",
      "당신을 도와줄 운명의 귀인",
      "운명을 바꾸는 방법",
      "12개월 월별 상세 운세",
      "앞으로 10년간 운명 분석",
    ],
  },
];

const BIRTH_TIMES = [
  { value: "", label: "모름 / 미입력" },
  { value: "子時", label: "子時 — 밤 11시 ~ 새벽 1시" },
  { value: "丑時", label: "丑時 — 새벽 1시 ~ 3시" },
  { value: "寅時", label: "寅時 — 새벽 3시 ~ 5시" },
  { value: "卯時", label: "卯時 — 새벽 5시 ~ 7시" },
  { value: "辰時", label: "辰時 — 오전 7시 ~ 9시" },
  { value: "巳時", label: "巳時 — 오전 9시 ~ 11시" },
  { value: "午時", label: "午時 — 오전 11시 ~ 오후 1시" },
  { value: "未時", label: "未時 — 오후 1시 ~ 3시" },
  { value: "申時", label: "申時 — 오후 3시 ~ 5시" },
  { value: "酉時", label: "酉時 — 오후 5시 ~ 7시" },
  { value: "戌時", label: "戌時 — 오후 7시 ~ 9시" },
  { value: "亥時", label: "亥時 — 오후 9시 ~ 11시" },
];

const REGIONS = [
  "선택 안 함", "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종",
  "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주",
];

// 공통 입력 스타일
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  background: "#fff",
  border: "1px solid rgba(184,134,11,0.35)",
  borderRadius: 4,
  fontSize: "1rem",
  color: "#1e1a14",
  fontFamily: "'Noto Sans KR', sans-serif",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  ...S.serif,
  fontSize: "0.85rem",
  fontWeight: 700,
  color: "#1e1a14",
  display: "block",
  marginBottom: "0.4rem",
};

export default function Apply() {
  const [, navigate] = useLocation();
  const [product, setProduct] = useState("premium");
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"남성" | "여성" | "">("");
  const [calType, setCalType] = useState<"양력" | "음력">("양력");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [region, setRegion] = useState("선택 안 함");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedProduct = PRODUCTS.find(p => p.id === product)!;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { toast.error("이름을 입력해주세요."); return; }
    if (!gender) { toast.error("성별을 선택해주세요."); return; }
    if (!birthYear || !birthMonth || !birthDay) { toast.error("생년월일을 입력해주세요."); return; }
    if (!email.trim()) { toast.error("이메일을 입력해주세요."); return; }
    if (!phone.trim()) { toast.error("전화번호를 입력해주세요."); return; }
    if (!agreed) { toast.error("개인정보 수집·이용에 동의해주세요."); return; }

    setSubmitting(true);
    const payload = {
      신청일시: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
      상품: selectedProduct.name,
      금액: selectedProduct.price,
      이름: name,
      성별: gender,
      생년월일: `${birthYear}-${birthMonth.padStart(2,"0")}-${birthDay.padStart(2,"0")} (${calType})`,
      출생시각: birthTime || "모름",
      출생지: region,
      이메일: email,
      전화번호: phone,
    };

    try {
      if (SHEETS_WEBHOOK_URL) {
        await fetch(SHEETS_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setSubmitted(true);
    } catch {
      toast.error("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  // 계좌번호 복사
  const ACCOUNT_NUMBER = "3333-26-3204251";
  const [copied, setCopied] = useState(false);
  function copyAccount() {
    navigator.clipboard.writeText(ACCOUNT_NUMBER).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  // 완료 화면
  if (submitted) {
    return (
      <div style={{ background: S.hanji, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1.25rem" }}>
        <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
          {/* 체크 아이콘 */}
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "linear-gradient(135deg, #8b6508, #c9a84c)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.2rem",
            fontSize: "1.8rem",
          }}>✦</div>

          <h1 style={{ ...S.serif, fontSize: "1.6rem", fontWeight: 900, color: S.ink, marginBottom: "0.6rem", lineHeight: 1.4 }}>
            신청이 완료되었습니다
          </h1>
          <p style={{ ...S.sans, fontSize: "0.88rem", color: S.muted, lineHeight: 1.8, marginBottom: "1.8rem" }}>
            <strong style={{ color: S.ink }}>{name}</strong> 님의 신청을 접수했습니다.<br />
            입금 확인 후 <strong style={{ color: S.gold }}>24시간 이내</strong>에<br />
            <strong style={{ color: S.ink }}>{email}</strong>로 리포트를 발송해드립니다.
          </p>

          {/* 입금 안내 카드 */}
          <div style={{
            background: "#faf7f0",
            border: "1px solid rgba(184,134,11,0.35)",
            borderRadius: 6,
            padding: "1.4rem 1.2rem",
            marginBottom: "1.5rem",
            textAlign: "left",
          }}>
            <p style={{ ...S.serif, fontSize: "0.78rem", fontWeight: 700, color: S.gold, marginBottom: "1rem", letterSpacing: "0.06em" }}>
              편의 입금 안내
            </p>

            {/* 상품 / 금액 */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ ...S.sans, fontSize: "0.8rem", color: S.muted }}>상품</span>
              <span style={{ ...S.serif, fontSize: "0.82rem", fontWeight: 700, color: S.ink }}>{selectedProduct.name}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{ ...S.sans, fontSize: "0.8rem", color: S.muted }}>입금 금액</span>
              <span style={{ ...S.serif, fontSize: "1rem", fontWeight: 900, color: S.gold }}>{selectedProduct.price}</span>
            </div>

            {/* 구분선 */}
            <div style={{ height: 1, background: "rgba(184,134,11,0.2)", marginBottom: "1rem" }} />

            {/* 계좌 정보 */}
            <div style={{ marginBottom: "0.4rem" }}>
              <span style={{ ...S.sans, fontSize: "0.72rem", color: S.muted }}>은행</span>
              <span style={{ ...S.serif, fontSize: "0.85rem", fontWeight: 700, color: S.ink, marginLeft: "0.5rem" }}>카카오뱅크</span>
            </div>
            <div style={{ marginBottom: "0.4rem" }}>
              <span style={{ ...S.sans, fontSize: "0.72rem", color: S.muted }}>예금주</span>
              <span style={{ ...S.serif, fontSize: "0.85rem", fontWeight: 700, color: S.ink, marginLeft: "0.5rem" }}>에스랩</span>
            </div>

            {/* 계좌번호 + 복사 버튼 */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: copied ? "rgba(184,134,11,0.1)" : "rgba(250,247,240,1)",
              border: `1px solid ${copied ? "#b8860b" : "rgba(184,134,11,0.3)"}`,
              borderRadius: 4,
              padding: "0.7rem 0.9rem",
              marginTop: "0.8rem",
              transition: "all 0.2s ease",
            }}>
              <span style={{ ...S.serif, fontSize: "1.05rem", fontWeight: 700, color: S.ink, letterSpacing: "0.04em" }}>
                {ACCOUNT_NUMBER}
              </span>
              <button
                onClick={copyAccount}
                style={{
                  ...S.sans,
                  background: copied
                    ? "#b8860b"
                    : "linear-gradient(135deg, #8b6508, #c9a84c)",
                  border: "none",
                  borderRadius: 3,
                  padding: "0.4rem 0.8rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#1e1a14",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                  letterSpacing: "0.02em",
                }}
              >
                {copied ? "✓ 복사됨" : "계좌복사"}
              </button>
            </div>
          </div>

          <p style={{ ...S.sans, fontSize: "0.72rem", color: "#8a8278", marginBottom: "1.5rem", lineHeight: 1.7 }}>
            입금자명은 다를 수 있습니다.<br />
            입금 후 이메일이 오지 않으면 스팸 폴더를 확인해주세요.
          </p>

          <button
            onClick={() => navigate("/")}
            style={{
              ...S.serif,
              background: "transparent",
              border: "1px solid rgba(184,134,11,0.5)",
              borderRadius: 4,
              padding: "0.75rem 2rem",
              fontSize: "0.9rem",
              color: S.gold,
              cursor: "pointer",
            }}
          >
            ← 홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: S.hanji, minHeight: "100vh" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", paddingBottom: "2rem" }}>

        {/* 헤더 */}
        <div style={{
          background: "#faf7f0",
          borderBottom: "1px solid rgba(184,134,11,0.2)",
          padding: "1.2rem 1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}>
          <button
            onClick={() => navigate("/")}
            style={{ background: "none", border: "none", color: S.muted, fontSize: "1.2rem", cursor: "pointer", padding: "0.2rem 0.4rem" }}
          >
            ←
          </button>
          <div>
            <p style={{ ...S.serif, fontSize: "0.65rem", color: S.muted, letterSpacing: "0.12em" }}>命言四柱</p>
            <p style={{ ...S.serif, fontSize: "1rem", fontWeight: 700, color: S.ink }}>사주 신청</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "1.5rem 1.25rem", display: "flex", flexDirection: "column", gap: "1.8rem" }}>

          {/* 상품 선택 */}
          <div>
            <p style={{ ...S.serif, fontSize: "0.75rem", color: S.muted, letterSpacing: "0.1em", marginBottom: "0.8rem" }}>STEP 1 · 상품 선택</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {PRODUCTS.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProduct(p.id)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    padding: "1rem",
                    background: product === p.id ? "rgba(184,134,11,0.08)" : "#faf7f0",
                    border: `2px solid ${product === p.id ? "#b8860b" : "rgba(184,134,11,0.25)"}`,
                    borderRadius: 4,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                >
                  {/* 라디오 원 */}
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                    border: `2px solid ${product === p.id ? "#b8860b" : "#c8b89a"}`,
                    background: product === p.id ? "#b8860b" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {product === p.id && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                      <span style={{ ...S.serif, fontSize: "1rem", fontWeight: 700, color: S.ink }}>{p.name}</span>
                      {p.badge && (
                        <span style={{
                          background: "#9b2020", color: "#faf7f0",
                          fontSize: "0.6rem", fontWeight: 700, padding: "0.15rem 0.4rem",
                          borderRadius: 2, letterSpacing: "0.04em",
                          fontFamily: "'Noto Sans KR', sans-serif",
                        }}>{p.badge}</span>
                      )}
                    </div>
                    <p style={{ ...S.serif, fontSize: "1.15rem", fontWeight: 900, color: S.gold, marginBottom: "0.5rem" }}>{p.price}</p>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                      {p.features.map(f => (
                        <li key={f} style={{ ...S.sans, fontSize: "0.75rem", color: S.muted, display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          <span style={{ color: S.gold, fontSize: "0.6rem" }}>✦</span>{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 구분선 */}
          <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(184,134,11,0.4),transparent)" }} />

          {/* 출생 정보 */}
          <div>
            <p style={{ ...S.serif, fontSize: "0.75rem", color: S.muted, letterSpacing: "0.1em", marginBottom: "1.2rem" }}>STEP 2 · 출생 정보</p>

            {/* 이름 */}
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={labelStyle}>이름 <span style={{ color: "#9b2020" }}>*</span></label>
              <input
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* 성별 */}
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={labelStyle}>성별 <span style={{ color: "#9b2020" }}>*</span></label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                {(["남성", "여성"] as const).map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    style={{
                      padding: "0.75rem",
                      background: gender === g ? "rgba(184,134,11,0.1)" : "#fff",
                      border: `2px solid ${gender === g ? "#b8860b" : "rgba(184,134,11,0.3)"}`,
                      borderRadius: 4,
                      ...S.serif,
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: gender === g ? S.gold : S.muted,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >{g}</button>
                ))}
              </div>
            </div>

            {/* 양력/음력 */}
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={labelStyle}>양력 / 음력 <span style={{ color: "#9b2020" }}>*</span></label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                {(["양력", "음력"] as const).map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCalType(c)}
                    style={{
                      padding: "0.75rem",
                      background: calType === c ? "rgba(184,134,11,0.1)" : "#fff",
                      border: `2px solid ${calType === c ? "#b8860b" : "rgba(184,134,11,0.3)"}`,
                      borderRadius: 4,
                      ...S.serif,
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: calType === c ? S.gold : S.muted,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >{c}</button>
                ))}
              </div>
            </div>

            {/* 생년월일 */}
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={labelStyle}>생년월일 <span style={{ color: "#9b2020" }}>*</span></label>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "0.5rem" }}>
                <input type="text" inputMode="numeric" placeholder="1989" maxLength={4} value={birthYear} onChange={e => setBirthYear(e.target.value.replace(/\D/g, ""))} style={{ ...inputStyle, textAlign: "center" }} />
                <input type="text" inputMode="numeric" placeholder="05" maxLength={2} value={birthMonth} onChange={e => setBirthMonth(e.target.value.replace(/\D/g, ""))} style={{ ...inputStyle, textAlign: "center" }} />
                <input type="text" inputMode="numeric" placeholder="29" maxLength={2} value={birthDay} onChange={e => setBirthDay(e.target.value.replace(/\D/g, ""))} style={{ ...inputStyle, textAlign: "center" }} />
              </div>
              <p style={{ ...S.sans, fontSize: "0.68rem", color: "#8a8278", marginTop: "0.3rem" }}>년 · 월 · 일 순으로 입력</p>
            </div>

            {/* 출생 시각 */}
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={labelStyle}>출생 시각 <span style={{ ...S.sans, fontSize: "0.72rem", fontWeight: 400, color: S.muted }}>(모르면 빈칸)</span></label>
              <select
                value={birthTime}
                onChange={e => setBirthTime(e.target.value)}
                style={{ ...inputStyle, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23b8860b' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", paddingRight: "2.5rem" }}
              >
                {BIRTH_TIMES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>

            {/* 출생지 */}
            <div>
              <label style={labelStyle}>출생지 <span style={{ ...S.sans, fontSize: "0.72rem", fontWeight: 400, color: S.muted }}>(모르면 빈칸)</span></label>
              <select
                value={region}
                onChange={e => setRegion(e.target.value)}
                style={{ ...inputStyle, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23b8860b' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", paddingRight: "2.5rem" }}
              >
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          {/* 구분선 */}
          <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(184,134,11,0.4),transparent)" }} />

          {/* 연락처 */}
          <div>
            <p style={{ ...S.serif, fontSize: "0.75rem", color: S.muted, letterSpacing: "0.1em", marginBottom: "1.2rem" }}>STEP 3 · 연락처</p>

            <div style={{ marginBottom: "1.2rem" }}>
              <label style={labelStyle}>이메일 <span style={{ color: "#9b2020" }}>*</span></label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputStyle}
              />
              <p style={{ ...S.sans, fontSize: "0.68rem", color: "#8a8278", marginTop: "0.3rem" }}>사주 결과 리포트 전달용 이메일</p>
            </div>

            <div>
              <label style={labelStyle}>전화번호 <span style={{ color: "#9b2020" }}>*</span></label>
              <input
                type="tel"
                placeholder="01012345678"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                maxLength={11}
                style={inputStyle}
                inputMode="numeric"
              />
              <p style={{ ...S.sans, fontSize: "0.68rem", color: "#8a8278", marginTop: "0.3rem" }}>010으로 시작하는 휴대폰 번호 11자리</p>
            </div>
          </div>

          {/* 발송 안내 */}
          <div style={{
            background: "#faf7f0",
            border: "1px solid rgba(184,134,11,0.25)",
            borderRadius: 4,
            padding: "1rem 1.1rem",
            display: "flex",
            gap: "0.75rem",
            alignItems: "flex-start",
          }}>
            <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>📬</span>
            <p style={{ ...S.sans, fontSize: "0.82rem", color: S.ink, lineHeight: 1.8 }}>
              입금 완료 후 <strong style={{ color: S.gold }}>24시간 이내</strong>에<br />
              사주풀이 리포트를 이메일로 발송해드립니다
            </p>
          </div>

          {/* 개인정보 동의 */}
          <div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer" }}
              onClick={() => setAgreed(!agreed)}
            >
              <div style={{
                width: 20, height: 20, borderRadius: 3, flexShrink: 0,
                border: `2px solid ${agreed ? "#b8860b" : "rgba(184,134,11,0.4)"}`,
                background: agreed ? "#b8860b" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.15s ease",
              }}>
                {agreed && <span style={{ color: "#fff", fontSize: "0.75rem", lineHeight: 1 }}>✓</span>}
              </div>
              <span style={{ ...S.sans, fontSize: "0.85rem", color: S.ink }}>
                <strong>[필수]</strong> 개인정보 수집·이용에 동의합니다
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowPrivacy(!showPrivacy)}
              style={{ ...S.sans, background: "none", border: "none", color: S.muted, fontSize: "0.72rem", cursor: "pointer", marginTop: "0.4rem", padding: "0.2rem 0", textDecoration: "underline" }}
            >
              개인정보 수집 내용 보기 {showPrivacy ? "▲" : "▼"}
            </button>
            {showPrivacy && (
              <div style={{
                marginTop: "0.5rem",
                background: "#faf7f0",
                border: "1px solid rgba(184,134,11,0.2)",
                borderRadius: 4,
                padding: "0.8rem 1rem",
              }}>
                <p style={{ ...S.sans, fontSize: "0.7rem", color: S.muted, lineHeight: 1.8 }}>
                  <strong>수집 항목:</strong> 이름, 성별, 생년월일, 출생시각, 출생지, 이메일, 전화번호<br />
                  <strong>수집 목적:</strong> 사주 분석 및 리포트 전달<br />
                  <strong>보유 기간:</strong> 서비스 제공 완료 후 즉시 파기<br />
                  입력하신 개인정보는 사주 분석 목적 외에는 사용되지 않습니다.
                </p>
              </div>
            )}
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: "100%",
              padding: "1.1rem 0",
              background: submitting
                ? "rgba(184,134,11,0.4)"
                : "linear-gradient(135deg, #8b6508 0%, #c9a84c 30%, #e8c97a 50%, #c9a84c 70%, #8b6508 100%)",
              backgroundSize: "200% 200%",
              animation: submitting ? "none" : "gold-shimmer 4s ease infinite",
              border: "none",
              borderRadius: 4,
              ...S.serif,
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#1e1a14",
              cursor: submitting ? "not-allowed" : "pointer",
              letterSpacing: "0.05em",
              boxShadow: submitting ? "none" : "0 4px 20px rgba(184,134,11,0.35)",
              transition: "all 0.16s ease",
            }}
          >
            {submitting ? "신청 중..." : "✦ 신청 완료하기"}
          </button>

          <p style={{ ...S.sans, fontSize: "0.65rem", color: "#8a8278", textAlign: "center" }}>
            입력 정보는 사주 풀이 목적으로만 사용됩니다
          </p>
        </form>
      </div>
    </div>
  );
}
