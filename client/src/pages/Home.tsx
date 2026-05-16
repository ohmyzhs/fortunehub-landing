/**
 * 명언사주 랜딩페이지 v2
 * 디자인: 한지·수묵화 — 텍스트가 이미지 안에 합성된 섹션 이미지 중심 구성
 * 원칙: 이미지가 주역, HTML 텍스트는 이미지에 없는 내용만 최소로
 */

import { useEffect, useRef } from "react";

// 이미지 URL
const IMG = {
  hero:     "https://d2xsxph8kpxj0f.cloudfront.net/310519663647996789/PTDt7U4WBXkpSwNXbuyH94/v2-hero-dtDz2vLJQX3dLo4wt59wTX.webp",
  section2: "https://d2xsxph8kpxj0f.cloudfront.net/310519663647996789/PTDt7U4WBXkpSwNXbuyH94/v2-section2-dfTMdSQkni6zXYdubZLvLQ.webp",
  section3: "https://d2xsxph8kpxj0f.cloudfront.net/310519663647996789/PTDt7U4WBXkpSwNXbuyH94/v3-section3-8wX5NLhfJMVHFEsRnWVzkJ.webp",
  section4: "https://d2xsxph8kpxj0f.cloudfront.net/310519663647996789/PTDt7U4WBXkpSwNXbuyH94/v4-section4-cXAmshZ4vTfKsAsoSuUhWB.webp",
  pricing:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663647996789/PTDt7U4WBXkpSwNXbuyH94/v4-pricing-PdMT3RbpVg4Evp6HhhGZ2e.webp",
  // 실제 리포트 스크린샷
  reportSajuTable: "/images/report-saju-table.png",
  reportOhang:     "/images/report-ohang.png",
  reportSipsin:    "/images/report-sipsin.png",
  // 기존 샘플
  sampleCover:    "/images/myeongeon-sample-cover.png",
  sampleToc:      "/images/myeongeon-sample-toc.png",
};

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// 공통 스타일
const S = {
  serif: { fontFamily: "'Noto Serif KR', 'Apple Myungjo', Georgia, serif" } as React.CSSProperties,
  sans:  { fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif" } as React.CSSProperties,
  gold:  "#b8860b",
  ink:   "#1e1a14",
  muted: "#6b5e4e",
  hanji: "#f5f0e6",
};

/** 섹션 1: 히어로 — 이미지 전체 표시, 하단 CTA만 오버레이 */
function HeroSection() {
  return (
    <section style={{ maxWidth: 480, margin: "0 auto", position: "relative" }}>
      <img
        src={IMG.hero}
        alt="사주를 깊이 풀이합니다 — 명언사주"
        style={{ width: "100%", display: "block" }}
      />
      {/* 이미지 안에 이미 CTA 버튼이 있지만 실제 클릭 가능한 버튼 오버레이 */}
      <div style={{
        position: "absolute",
        bottom: "6.5%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "72%",
      }}>
        <a
          href="#apply"
          style={{
            display: "block",
            width: "100%",
            height: "52px",
            opacity: 0, // 이미지의 버튼 위에 투명하게 올려서 클릭 영역만 확보
          }}
          aria-label="내 사주 분석 받기"
        />
      </div>
    </section>
  );
}

/** 섹션 2: 문제 제기 — 이미지 전체 */
function ProblemSection() {
  const ref = useFadeIn();
  return (
    <section ref={ref} className="fade-in-up" style={{ maxWidth: 480, margin: "0 auto" }}>
      <img
        src={IMG.section2}
        alt="왜 내 인생은 이렇게 흘러가는 걸까"
        style={{ width: "100%", display: "block" }}
      />
    </section>
  );
}

/** 섹션 3: 핵심 분석 요소 — 텍스트 완전 합성 이미지 */
function SystemSection() {
  const ref = useFadeIn();
  return (
    <section ref={ref} className="fade-in-up" style={{ maxWidth: 480, margin: "0 auto" }}>
      <img
        src="https://d2xsxph8kpxj0f.cloudfront.net/310519663647996789/PTDt7U4WBXkpSwNXbuyH94/v3-section3-8wX5NLhfJMVHFEsRnWVzkJ.webp"
        alt="핵심 분석 요소 — 사주팔자 명식, 음양오행, 십성 풀이, 대운세운, 직업재물운, 연애결혼운, 건강체질, 인간관계, 현재시기, 조언방향, 핵심요약"
        style={{ width: "100%", display: "block" }}
      />
    </section>
  );
}

/** 섹션 4: 리포트 소개 — 이미지 전체 */
function ReportSection() {
  const ref = useFadeIn();
  return (
    <section ref={ref} className="fade-in-up" style={{ maxWidth: 480, margin: "0 auto" }}>
      <img
        src={IMG.section4}
        alt="단순 풀이가 아닙니다 — 120페이지 이상 프리미엄 사주 리포트"
        style={{ width: "100%", display: "block" }}
      />
    </section>
  );
}

/** 섹션 5: 샘플 리포트 */
function SampleSection() {
  const ref = useFadeIn();
  const samples = [
    {
      img: IMG.sampleCover,
      label: "표지",
      desc: "한 권의 책체럼 정중하게 시작합니다",
    },
    {
      img: IMG.sampleToc,
      label: "목차",
      desc: "사주팔자 상세분석·황금기·연애운·재물운·직업·건강·귀인·운명·월별운세·10년 분석까지",
    },
    {
      img: IMG.reportSajuTable,
      label: "사주팔자 명식 및 용신분석",
      desc: "천간·지지·십성·신살을 한눈에, 오행의 조화와 용신을 상세히 풀이합니다",
    },
    {
      img: IMG.reportOhang,
      label: "음양오행 분석",
      desc: "나를 구성하는 에너지의 균형을 차트와 함께 시각적으로 풀어냕니다",
    },
    {
      img: IMG.reportSipsin,
      label: "십신(十神) 분포",
      desc: "타고난 기질의 강약을 비견·식상·재성·관성·인성 5가지 카테고리로 정리합니다",
    },
  ];
  return (
    <section style={{ background: S.hanji, padding: "3rem 0", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ padding: "0 1.25rem" }}>
        <div ref={ref} className="fade-in-up">
          <p style={{ ...S.sans, fontSize: "0.65rem", letterSpacing: "0.18em", color: "#8a8278", textAlign: "center", marginBottom: "0.4rem" }}>
            SAMPLE REPORT
          </p>
          <h2 style={{ ...S.serif, fontSize: "clamp(1.3rem, 6vw, 1.6rem)", fontWeight: 900, color: S.ink, textAlign: "center", lineHeight: 1.4, marginBottom: "0.5rem" }}>
            실제 리포트는<br />이런 모습입니다
          </h2>
          <p style={{ ...S.sans, fontSize: "clamp(0.78rem, 3.2vw, 0.88rem)", color: S.muted, textAlign: "center", lineHeight: 1.7, marginBottom: "2rem" }}>
            120페이지 이상 분량의 정통사주 리포트<br />일부를 미리 만나보세요
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {samples.map((s) => (
              <div key={s.label}>
                <div style={{
                  border: "1px solid rgba(184,134,11,0.3)",
                  borderRadius: 4,
                  overflow: "hidden",
                  background: "#fff",
                }}>
                  {/* 이미지 전체 표시 — 즤리지 않도록 objectFit 제거 */}
                  <img
                    src={s.img}
                    alt={s.label}
                    style={{ width: "100%", display: "block", height: "auto" }}
                  />
                </div>
                <div style={{ marginTop: "0.7rem" }}>
                  <p style={{ ...S.serif, fontSize: "clamp(0.9rem, 3.8vw, 1rem)", fontWeight: 700, color: S.ink }}>
                    {s.label}
                  </p>
                  <p style={{ ...S.sans, fontSize: "clamp(0.75rem, 3.1vw, 0.83rem)", color: S.muted, marginTop: "0.25rem", lineHeight: 1.65 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ ...S.sans, marginTop: "1.5rem", fontSize: "0.65rem", color: "#8a8278", textAlign: "center" }}>
            ※ 샘플은 일부 페이지이며, 실제 리포트는 120페이지 이상 분량으로 발송됩니다.
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
    <section style={{ background: "#faf7f0", padding: "3rem 0", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ padding: "0 1.25rem" }}>
        <div ref={ref} className="fade-in-up">
          <p style={{ ...S.sans, fontSize: "0.65rem", letterSpacing: "0.18em", color: "#8a8278", textAlign: "center", marginBottom: "0.4rem" }}>
            REAL REVIEWS
          </p>
          <h2 style={{ ...S.serif, fontSize: "clamp(1.3rem, 6vw, 1.6rem)", fontWeight: 900, color: S.ink, textAlign: "center", lineHeight: 1.4, marginBottom: "0.5rem" }}>
            명언사주를 만난 분들의<br />이야기
          </h2>
          <p style={{ ...S.sans, fontSize: "clamp(0.75rem, 3.2vw, 0.85rem)", color: S.muted, textAlign: "center", marginBottom: "2rem" }}>
            실제 사주 풀이를 받아보신 분들이 직접 남겨주신 후기입니다
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {reviews.map((r, i) => (
              <div key={i} style={{
                background: "rgba(250,247,240,0.95)",
                border: "1px solid rgba(184,134,11,0.28)",
                borderRadius: 4,
                padding: "1.25rem 1rem 1rem",
                position: "relative",
              }}>
                <span style={{
                  position: "absolute", top: "-0.6rem", left: "0.9rem",
                  fontSize: "2.8rem", color: "rgba(184,134,11,0.2)",
                  ...S.serif, lineHeight: 1,
                }}>"</span>
                <p style={{ ...S.sans, fontSize: "clamp(0.8rem, 3.3vw, 0.9rem)", color: "#3a3228", lineHeight: 1.8, marginBottom: "0.8rem" }}>
                  {r.text}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(184,134,11,0.4), transparent)" }} />
                  <span style={{ ...S.serif, fontSize: "clamp(0.68rem, 2.8vw, 0.75rem)", color: "#8a8278" }}>{r.name} · {r.age}</span>
                </div>
              </div>
            ))}
          </div>
          <p style={{ ...S.sans, marginTop: "1rem", fontSize: "0.62rem", color: "#8a8278", textAlign: "center" }}>
            ※ 후기는 실제 고객분들이 작성하신 내용이며, 개인정보 보호를 위해 이름은 일부만 표기됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}

/** 섹션 7: 상품 선택 — 이미지 전체 (버튼은 Fixed CTA로 이동) */
function PricingSection() {
  const ref = useFadeIn();
  return (
    <section ref={ref} className="fade-in-up" id="pricing" style={{ maxWidth: 480, margin: "0 auto" }}>
      <img
        src={IMG.pricing}
        alt="기본 사주 분석 9,900원 / 정통사주 종합분석 29,800원"
        style={{ width: "100%", display: "block" }}
      />
    </section>
  );
}

/** 푸터 */
function Footer() {
  return (
    <footer style={{
      background: "#faf7f0",
      borderTop: "1px solid rgba(184,134,11,0.2)",
      padding: "2.5rem 1.25rem 2rem",
      maxWidth: 480,
      margin: "0 auto",
    }}>
      <div style={{ textAlign: "center", marginBottom: "1.2rem" }}>
        <p style={{ ...S.serif, fontSize: "1rem", fontWeight: 700, letterSpacing: "0.25em", color: S.ink }}>
          命 言 四 柱
        </p>
        <p style={{ ...S.sans, fontSize: "0.7rem", color: "#8a8278", marginTop: "0.2rem" }}>진심을 담은 사주풀이</p>
      </div>
      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(184,134,11,0.4),transparent)", marginBottom: "1.2rem" }} />
      <div style={{ ...S.sans, fontSize: "clamp(0.62rem, 2.5vw, 0.7rem)", color: "#8a8278", lineHeight: 2.1, textAlign: "center" }}>
        <p>상호: 에스랩 &nbsp;|&nbsp; 대표자: 김가별</p>
        <p>사업자등록번호: 196-19-01302</p>
      </div>
      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(184,134,11,0.4),transparent)", margin: "1.2rem 0" }} />
      <p style={{ ...S.sans, fontSize: "clamp(0.6rem, 2.4vw, 0.68rem)", color: "#8a8278", textAlign: "center", lineHeight: 1.7 }}>
        본 서비스에서 제공되는 사주 풀이는 전통 명리학에 기반한 참고 자료이며,<br />
        개인의 미래를 단정하지 않습니다.
      </p>
      <p style={{ ...S.sans, marginTop: "1rem", fontSize: "0.6rem", color: "#b0a898", textAlign: "center" }}>
        © 2026 명언사주. All rights reserved.
      </p>
    </footer>
  );
}

/** Fixed CTA 버튼 — 항상 하단 고정 */
function FixedCTA() {
  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 480,
      zIndex: 100,
      padding: "0.75rem 1.25rem",
      background: "linear-gradient(to top, rgba(245,240,230,0.98) 70%, transparent)",
      pointerEvents: "none",
    }}>
      <a
        href="/apply"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          width: "100%",
          padding: "1rem 0",
          borderRadius: 4,
          background: "linear-gradient(135deg, #8b6508 0%, #c9a84c 30%, #e8c97a 50%, #c9a84c 70%, #8b6508 100%)",
          backgroundSize: "200% 200%",
          animation: "gold-shimmer 4s ease infinite",
          color: "#1e1a14",
          fontFamily: "'Noto Serif KR', serif",
          fontWeight: 700,
          fontSize: "clamp(1rem, 4.5vw, 1.1rem)",
          letterSpacing: "0.06em",
          textDecoration: "none",
          boxShadow: "0 4px 20px rgba(184,134,11,0.45), 0 2px 8px rgba(0,0,0,0.15)",
          pointerEvents: "auto",
          transition: "transform 0.16s cubic-bezier(0.23,1,0.32,1), box-shadow 0.16s ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
      >
        ✦ 지금 사주 신청하기 →
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ background: S.hanji, minHeight: "100vh" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", paddingBottom: "5rem" }}>
        <HeroSection />
        <ProblemSection />
        <SystemSection />
        <ReportSection />
        <SampleSection />
        <ReviewSection />
        <PricingSection />
        <Footer />
      </div>
      <FixedCTA />
    </div>
  );
}
