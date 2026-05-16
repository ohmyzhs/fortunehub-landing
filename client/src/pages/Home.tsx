/**
 * 명언사주 랜딩페이지
 * 디자인: 한지·수묵화 테마 — 밝은 베이지 배경 + 수묵 차콜 + 황금 포인트 + 붉은 인장
 * 이미지: /manus-storage/* (기존 생성 이미지 활용)
 */

import { useEffect, useRef } from "react";

// 업로드된 이미지 경로
const IMG = {
  hero:     "/manus-storage/myeongeon-hero_13b95516.png",
  section2: "/manus-storage/myeongeon-section2_2fb5c203.png",
  section3: "/manus-storage/myeongeon-section3_afdf8dcd.png",
  section4: "/manus-storage/myeongeon-section4_403e33d7.png",
  section7: "/manus-storage/myeongeon-section7_9c61ec64.png",
  sampleCover:    "/manus-storage/myeongeon-sample-cover_c4406aa1.png",
  sampleToc:      "/manus-storage/myeongeon-sample-toc_72334608.png",
  sampleSaju:     "/manus-storage/myeongeon-sample-saju_1f728795.png",
  sampleAnalysis: "/manus-storage/myeongeon-sample-analysis_41283f5a.png",
};

// 스크롤 페이드인 훅
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── 섹션 컴포넌트들 ──────────────────────────────────────────

/** 섹션 1: 히어로 */
function HeroSection() {
  const ref = useFadeIn();
  return (
    <section className="relative w-full" style={{ maxWidth: 480, margin: "0 auto" }}>
      {/* 히어로 이미지 */}
      <div className="relative">
        <img
          src={IMG.hero}
          alt="명언사주 히어로"
          className="w-full block"
          style={{ aspectRatio: "853/1844", objectFit: "cover" }}
        />
        {/* 텍스트 오버레이 */}
        <div
          className="absolute inset-0 flex flex-col"
          style={{ padding: "5% 6% 5%" }}
        >
          {/* 브랜드 로고 — 상단 좌측 */}
          <div className="flex items-center gap-2">
            <span
              className="seal-badge"
              style={{ fontSize: "0.55rem", padding: "0.2rem 0.4rem", lineHeight: 1.4 }}
            >
              命言<br />四柱
            </span>
            <span
              style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#faf7f0",
                letterSpacing: "0.12em",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              명언사주
            </span>
          </div>

          {/* 메인 카피 — 하단 */}
          <div ref={ref} className="fade-in-up mt-auto">
            <p
              style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: "0.75rem",
                color: "rgba(250,247,240,0.85)",
                letterSpacing: "0.08em",
                marginBottom: "0.5rem",
                textShadow: "0 1px 3px rgba(0,0,0,0.6)",
              }}
            >
              당신의 운명을 구조적으로 해석합니다
            </p>
            <h1
              style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "1.9rem",
                fontWeight: 900,
                color: "#faf7f0",
                lineHeight: 1.3,
                marginBottom: "1.4rem",
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              사주를 깊이<br />풀이합니다
            </h1>
            <a
              href="#apply"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-sm text-sm"
            >
              내 사주 분석 받기 →
            </a>
          </div>
        </div>
      </div>

      {/* 4가지 특징 아이콘 바 */}
      <div
        style={{
          background: "#faf7f0",
          borderTop: "1px solid rgba(184,134,11,0.2)",
          borderBottom: "1px solid rgba(184,134,11,0.2)",
          padding: "1rem 0",
        }}
      >
        <div className="container">
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { icon: "☯", label: "정통 명리학", sub: "사주팔자를 기반으로" },
              { icon: "📖", label: "12가지 분석", sub: "사주 구조 입체적으로" },
              { icon: "📄", label: "80~100p 리포트", sub: "책 한 권 분량의 풀이" },
              { icon: "🔒", label: "PDF 리포트 제공", sub: "언제든지 확인 가능" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                <span
                  style={{
                    fontFamily: "'Noto Serif KR', serif",
                    fontSize: "0.55rem",
                    fontWeight: 700,
                    color: "#1e1a14",
                    lineHeight: 1.3,
                  }}
                >
                  {item.label}
                </span>
                <span style={{ fontSize: "0.48rem", color: "#8a8278", lineHeight: 1.3 }}>
                  {item.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** 섹션 2: 문제 제기 */
function ProblemSection() {
  const ref = useFadeIn();
  const problems = [
    { icon: "👥", text: "반복되는 인간관계" },
    { icon: "💸", text: "막히는 돈의 흐름" },
    { icon: "😰", text: "불안한 미래" },
    { icon: "💔", text: "풀리지 않는 연애" },
  ];
  return (
    <section className="relative" style={{ maxWidth: 480, margin: "0 auto" }}>
      <div className="relative">
        <img
          src={IMG.section2}
          alt="문제 섹션 배경"
          className="w-full block"
          style={{ aspectRatio: "864/1821", objectFit: "cover" }}
        />
        {/* 오버레이 텍스트 */}
        <div
          className="absolute inset-0 flex flex-col justify-center"
          style={{ padding: "8% 7%" }}
        >
          <div ref={ref} className="fade-in-up">
            <p
              style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: "0.7rem",
                color: "#8a8278",
                letterSpacing: "0.1em",
                marginBottom: "0.5rem",
                textAlign: "center",
              }}
            >
              — 왜 내 인생은 —
            </p>
            <h2
              style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "1.5rem",
                fontWeight: 900,
                color: "#1e1a14",
                lineHeight: 1.4,
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              이렇게 흘러가는<br />걸까?
            </h2>
            <div className="flex flex-col gap-3">
              {problems.map((p, i) => (
                <div
                  key={i}
                  className="hanji-card flex items-center gap-3"
                  style={{ padding: "0.75rem 1rem" }}
                >
                  <span style={{ fontSize: "1.1rem" }}>{p.icon}</span>
                  <span
                    style={{
                      fontFamily: "'Noto Serif KR', serif",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#1e1a14",
                    }}
                  >
                    {p.text}
                  </span>
                </div>
              ))}
            </div>
            <p
              style={{
                marginTop: "1.5rem",
                textAlign: "center",
                fontSize: "0.75rem",
                color: "#6b5e4e",
                lineHeight: 1.7,
              }}
            >
              사주는 단순한 점이 아닙니다.<br />
              당신의 타고난 구조를 읽고,<br />
              <strong style={{ color: "#b8860b" }}>왜 그런 일이 반복되는지</strong> 밝혀냅니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 섹션 3: 핵심 분석 시스템 */
function SystemSection() {
  const ref = useFadeIn();
  const items = [
    { num: "01", label: "사주팔자 명식" },
    { num: "02", label: "음양오행 분석" },
    { num: "03", label: "십성 풀이" },
    { num: "04", label: "대운·세운" },
    { num: "05", label: "직업·재물운" },
    { num: "06", label: "연애·결혼운" },
    { num: "07", label: "건강·체질" },
    { num: "08", label: "인간관계" },
    { num: "09", label: "현재 시기 분석" },
    { num: "10", label: "조언·방향 제시" },
    { num: "11", label: "핵심 요약" },
  ];
  return (
    <section className="relative" style={{ maxWidth: 480, margin: "0 auto" }}>
      <div className="relative">
        <img
          src={IMG.section3}
          alt="핵심 분석 시스템"
          className="w-full block"
          style={{ aspectRatio: "941/1672", objectFit: "cover" }}
        />
        <div
          className="absolute inset-0 flex flex-col justify-center items-center"
          style={{ padding: "5% 6%" }}
        >
          <div ref={ref} className="fade-in-up w-full">
            <div className="text-center mb-4">
              <span className="seal-badge" style={{ marginBottom: "0.5rem", display: "inline-block" }}>
                命言四柱
              </span>
              <h2
                style={{
                  fontFamily: "'Noto Serif KR', serif",
                  fontSize: "1.3rem",
                  fontWeight: 900,
                  color: "#1e1a14",
                  marginTop: "0.4rem",
                  lineHeight: 1.4,
                }}
              >
                핵심 분석 요소
              </h2>
              <p style={{ fontSize: "0.7rem", color: "#6b5e4e", marginTop: "0.3rem" }}>
                정밀한 구조 분석으로 삶의 흐름을 짚어드립니다
              </p>
            </div>
            {/* 원형 배치 대신 그리드 */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {items.map((item) => (
                <div
                  key={item.num}
                  className="hanji-card text-center"
                  style={{ padding: "0.5rem 0.3rem" }}
                >
                  <div
                    style={{
                      fontSize: "0.55rem",
                      color: "#b8860b",
                      fontWeight: 700,
                      marginBottom: "0.15rem",
                    }}
                  >
                    {item.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Noto Serif KR', serif",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      color: "#1e1a14",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 섹션 4: 리포트 소개 */
function ReportSection() {
  const ref = useFadeIn();
  const features = [
    { icon: "📑", title: "PDF 바로 제공", desc: "고품질 인쇄 가능한 PDF" },
    { icon: "📚", title: "80~100페이지", desc: "빠짐없이 담은 풀이" },
    { icon: "🌙", title: "시기적 구분", desc: "대운·세운 흐름 분석" },
    { icon: "🔐", title: "평생 보관 가능", desc: "언제든 다시 열람" },
  ];
  return (
    <section style={{ background: "#f5f0e6", maxWidth: 480, margin: "0 auto" }}>
      <div className="relative">
        <img
          src={IMG.section4}
          alt="프리미엄 사주 리포트"
          className="w-full block"
          style={{ aspectRatio: "941/1672", objectFit: "cover" }}
        />
        <div
          className="absolute inset-0 flex flex-col justify-end"
          style={{ padding: "5% 6% 6%" }}
        >
          <div ref={ref} className="fade-in-up">
            <p
              style={{
                fontSize: "0.65rem",
                color: "#6b5e4e",
                letterSpacing: "0.1em",
                marginBottom: "0.3rem",
                textAlign: "center",
              }}
            >
              단순 풀이가 아닙니다
            </p>
            <h2
              style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "1.5rem",
                fontWeight: 900,
                color: "#1e1a14",
                textAlign: "center",
                lineHeight: 1.3,
                marginBottom: "0.3rem",
              }}
            >
              <span className="text-gold" style={{ fontSize: "2rem" }}>80~100</span>
              <span style={{ fontSize: "1rem" }}>페이지 분량의</span>
            </h2>
            <p
              style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#1e1a14",
                textAlign: "center",
                marginBottom: "1.2rem",
              }}
            >
              프리미엄 사주 리포트
            </p>
            <div className="grid grid-cols-2 gap-2">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="hanji-card flex items-start gap-2"
                  style={{ padding: "0.6rem 0.7rem" }}
                >
                  <span style={{ fontSize: "1rem" }}>{f.icon}</span>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Noto Serif KR', serif",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        color: "#1e1a14",
                      }}
                    >
                      {f.title}
                    </div>
                    <div style={{ fontSize: "0.58rem", color: "#8a8278", marginTop: "0.1rem" }}>
                      {f.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 섹션 5: 샘플 리포트 */
function SampleSection() {
  const ref = useFadeIn();
  const samples = [
    { img: IMG.sampleCover,    label: "표지", desc: "한 권의 책처럼 정중하게 시작합니다" },
    { img: IMG.sampleToc,      label: "목차 — 13장 구성", desc: "본성·강점·관계·사업·재물·체질·시기 등" },
    { img: IMG.sampleSaju,     label: "사주팔자 명식", desc: "천간·지지·음양오행·십성·지장간 풀이" },
    { img: IMG.sampleAnalysis, label: "오행 분포와 본문 풀이", desc: "차트와 함께 인생의 장면을 풀어냅니다" },
  ];
  return (
    <section style={{ background: "#faf7f0", padding: "3rem 0", maxWidth: 480, margin: "0 auto" }}>
      <div className="container">
        <div ref={ref} className="fade-in-up">
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "#8a8278",
              textAlign: "center",
              marginBottom: "0.4rem",
            }}
          >
            SAMPLE REPORT
          </p>
          <h2
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: "1.4rem",
              fontWeight: 900,
              color: "#1e1a14",
              textAlign: "center",
              lineHeight: 1.4,
              marginBottom: "0.5rem",
            }}
          >
            실제 리포트는<br />이런 모습입니다
          </h2>
          <p
            style={{
              fontSize: "0.72rem",
              color: "#6b5e4e",
              textAlign: "center",
              lineHeight: 1.7,
              marginBottom: "1.8rem",
            }}
          >
            80~100페이지 분량의 정통사주 리포트<br />일부를 미리 만나보세요
          </p>

          <div className="flex flex-col gap-5">
            {samples.map((s) => (
              <div key={s.label}>
                <div
                  className="hanji-card overflow-hidden"
                  style={{ border: "1px solid rgba(184,134,11,0.3)" }}
                >
                  <img
                    src={s.img}
                    alt={s.label}
                    className="w-full block"
                    style={{ maxHeight: 280, objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
                <div style={{ marginTop: "0.6rem", paddingLeft: "0.2rem" }}>
                  <p
                    style={{
                      fontFamily: "'Noto Serif KR', serif",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "#1e1a14",
                    }}
                  >
                    {s.label}
                  </p>
                  <p style={{ fontSize: "0.68rem", color: "#6b5e4e", marginTop: "0.15rem" }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "0.62rem",
              color: "#8a8278",
              textAlign: "center",
            }}
          >
            ※ 샘플은 일부 페이지이며, 실제 리포트는 80~100페이지 분량으로 발송됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}

/** 섹션 6: 후기 */
function ReviewSection() {
  const ref = useFadeIn();
  const reviews = [
    { text: "올해 이직 고민 때문에 상담받았는데 흐름을 너무 정확하게 짚어주셔서 놀랐어요. 말씀해주신 시기 지나고 바로 좋은 기회 들어왔습니다.", name: "박**", age: "29세" },
    { text: "재물운 상담 받았는데 현재 막혀있는 이유를 사주적으로 자세히 설명해주셔서 이해가 됐습니다. 조언대로 움직이니 금전 흐름이 훨씬 안정됐어요.", name: "김**", age: "35세" },
    { text: "연애운 상담인데 단순한 이야기보다 상대 성향이랑 관계 흐름을 디테일하게 봐주셔서 신뢰가 갔어요. 답답했던 마음이 많이 정리됐습니다.", name: "이**", age: "27세" },
    { text: "사업 방향 때문에 고민이 많았는데 제 사주에 맞는 타이밍과 사람운을 현실적으로 설명해주셔서 도움 많이 받았습니다.", name: "최**", age: "41세" },
    { text: "사주를 여러 번 봤지만 이렇게 차분하고 깊게 풀이해주는 곳은 처음이었습니다. 좋은 말만 하는 게 아니라 조심해야 할 부분까지 정확하게 알려주셔서 더 믿음이 갔어요.", name: "정**", age: "33세" },
  ];
  return (
    <section style={{ background: "#f5f0e6", padding: "3rem 0", maxWidth: 480, margin: "0 auto" }}>
      <div className="container">
        <div ref={ref} className="fade-in-up">
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "#8a8278",
              textAlign: "center",
              marginBottom: "0.4rem",
            }}
          >
            REAL REVIEWS
          </p>
          <h2
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: "1.4rem",
              fontWeight: 900,
              color: "#1e1a14",
              textAlign: "center",
              lineHeight: 1.4,
              marginBottom: "0.5rem",
            }}
          >
            명언사주를 만난 분들의<br />이야기
          </h2>
          <p
            style={{
              fontSize: "0.72rem",
              color: "#6b5e4e",
              textAlign: "center",
              marginBottom: "1.8rem",
            }}
          >
            실제 사주 풀이를 받아보신 분들이 직접 남겨주신 후기입니다
          </p>

          <div className="flex flex-col gap-3">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="review-card"
                style={{ padding: "1.2rem 1rem 1rem" }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#3a3228",
                    lineHeight: 1.75,
                    marginBottom: "0.7rem",
                  }}
                >
                  {r.text}
                </p>
                <div className="flex items-center gap-2">
                  <div className="divider-ink flex-1" />
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: "#8a8278",
                      fontFamily: "'Noto Serif KR', serif",
                    }}
                  >
                    {r.name} · {r.age}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.6rem",
              color: "#8a8278",
              textAlign: "center",
            }}
          >
            ※ 후기는 실제 고객분들이 작성하신 내용이며, 개인정보 보호를 위해 이름은 일부만 표기됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}

/** 섹션 7: 상품 선택 + 최종 CTA */
function PricingSection() {
  const ref = useFadeIn();
  const products = [
    {
      num: "01",
      title: "정통사주",
      sub: "운명의 흐름을 읽다",
      desc: "사주팔자 기반 종합 풀이\n직업·재물·건강·인간관계",
      href: "#apply",
    },
    {
      num: "02",
      title: "연애·결혼",
      sub: "인연의 마음을 잇다",
      desc: "연애운·결혼 적기·궁합\n이상형과 관계 패턴 분석",
      href: "#apply",
    },
    {
      num: "03",
      title: "재물·사업",
      sub: "재물운과 성공을 열다",
      desc: "재물운·사업 방향·투자 시기\n성공 전략과 주의사항",
      href: "#apply",
    },
    {
      num: "04",
      title: "궁합·상담",
      sub: "우리의 조화를 보다",
      desc: "두 사람의 사주 비교 분석\n관계의 강점과 보완점",
      href: "#apply",
    },
  ];
  return (
    <section className="relative" style={{ maxWidth: 480, margin: "0 auto" }}>
      <div className="relative">
        <img
          src={IMG.section7}
          alt="상품 선택"
          className="w-full block"
          style={{ aspectRatio: "887/1774", objectFit: "cover" }}
        />
        <div
          className="absolute inset-0 flex flex-col justify-end"
          style={{ padding: "5% 6% 6%" }}
        >
          <div ref={ref} className="fade-in-up">
            <h2
              style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "1.2rem",
                fontWeight: 900,
                color: "#1e1a14",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              원하는 리포트를 선택하세요
            </h2>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {products.map((p) => (
                <a
                  key={p.num}
                  href={p.href}
                  className="hanji-card block"
                  style={{ padding: "0.75rem 0.7rem", textDecoration: "none" }}
                >
                  <div
                    style={{
                      fontSize: "0.55rem",
                      color: "#b8860b",
                      fontWeight: 700,
                      marginBottom: "0.2rem",
                    }}
                  >
                    {p.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Noto Serif KR', serif",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#1e1a14",
                    }}
                  >
                    {p.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.6rem",
                      color: "#8a8278",
                      marginTop: "0.15rem",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {p.sub}
                  </div>
                  <div
                    style={{
                      fontSize: "0.6rem",
                      color: "#6b5e4e",
                      lineHeight: 1.5,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {p.desc}
                  </div>
                </a>
              ))}
            </div>
            <a
              id="apply"
              href="mailto:contact@myeongeonsaju.com"
              className="btn-gold w-full flex items-center justify-center gap-2 py-4 rounded-sm text-sm"
              style={{ textDecoration: "none" }}
            >
              지금 리포트 신청하기 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 푸터 */
function Footer() {
  return (
    <footer
      style={{
        background: "#faf7f0",
        borderTop: "1px solid rgba(184,134,11,0.2)",
        padding: "2.5rem 0 2rem",
        maxWidth: 480,
        margin: "0 auto",
      }}
    >
      <div className="container">
        {/* 브랜드 */}
        <div className="text-center mb-4">
          <div
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#1e1a14",
              marginBottom: "0.2rem",
            }}
          >
            命 言 四 柱
          </div>
          <p style={{ fontSize: "0.65rem", color: "#8a8278" }}>진심을 담은 사주풀이</p>
        </div>

        <div className="divider-ink mb-4" />

        {/* 사업자 정보 */}
        <div
          style={{
            fontSize: "0.6rem",
            color: "#8a8278",
            lineHeight: 2,
            textAlign: "center",
          }}
        >
          <p>상호: 명언사주 &nbsp;|&nbsp; 대표자: 홍길동</p>
          <p>사업자등록번호: 000-00-00000</p>
          <p>고객센터: 010-0000-0000</p>
          <p>이메일: contact@myeongeonsaju.com</p>
        </div>

        <div className="divider-ink my-4" />

        <p
          style={{
            fontSize: "0.58rem",
            color: "#8a8278",
            textAlign: "center",
            lineHeight: 1.7,
          }}
        >
          본 서비스에서 제공되는 사주 풀이는 전통 명리학에 기반한 참고 자료이며,<br />
          개인의 미래를 단정하지 않습니다.
        </p>
        <p
          style={{
            marginTop: "1rem",
            fontSize: "0.58rem",
            color: "#b0a898",
            textAlign: "center",
          }}
        >
          © 2026 명언사주. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ── 메인 페이지 ──────────────────────────────────────────────
export default function Home() {
  return (
    <div
      style={{
        background: "#f5f0e6",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 480 }}>
        <HeroSection />
        <ProblemSection />
        <SystemSection />
        <ReportSection />
        <SampleSection />
        <ReviewSection />
        <PricingSection />
        <Footer />
      </div>
    </div>
  );
}
