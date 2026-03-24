import clsx from "clsx";
import svgPaths from "./svg-oa8w2lhfl5";
type ContainerBackgroundImage2Props = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImage2Props>) {
  return (
    <div className={clsx("relative rounded-[10px] shrink-0 size-[48px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">{children}</div>
    </div>
  );
}
type ContainerBackgroundImage1Props = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImage1Props>) {
  return (
    <div className={clsx("flex-[1_0_0] min-h-px min-w-px relative", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#2f3d5e] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">{children}</p>
    </div>
  );
}
type BackgroundImage4Props = {
  additionalClassNames?: string;
};

function BackgroundImage4({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage4Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage3Props = {
  additionalClassNames?: string;
};

function BackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage3Props>) {
  return <BackgroundImage4 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</BackgroundImage4>;
}
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return <BackgroundImage4 additionalClassNames={clsx("h-[24px] relative shrink-0", additionalClassNames)}>{children}</BackgroundImage4>;
}

function BackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function ContainerBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[69px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e8ecf2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center pb-px px-[24px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

function IconBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type LinkBackgroundImageProps = {
  additionalClassNames?: string;
};

function LinkBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<LinkBackgroundImageProps>) {
  return (
    <div className={clsx("h-[40px] relative rounded-[10px] shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[16px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage1>
      <g id="Icon">{children}</g>
    </BackgroundImage1>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText({ text, additionalClassNames = "" }: TextBackgroundImageAndTextProps) {
  return (
    <BackgroundImage4 additionalClassNames={clsx("h-[16px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#bcc3d4] text-[12px] top-px whitespace-nowrap">{text}</p>
    </BackgroundImage4>
  );
}
type ParagraphBackgroundImageAndText7Props = {
  text: string;
};

function ParagraphBackgroundImageAndText7({ text }: ParagraphBackgroundImageAndText7Props) {
  return (
    <div className="h-[16px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9ba8c2] text-[12px] top-px whitespace-nowrap">{text}</p>
    </div>
  );
}
type ParagraphBackgroundImageAndText6Props = {
  text: string;
};

function ParagraphBackgroundImageAndText6({ text }: ParagraphBackgroundImageAndText6Props) {
  return <BackgroundImage5>{text}</BackgroundImage5>;
}
type BackgroundImageAndText3Props = {
  text: string;
};

function BackgroundImageAndText3({ text }: BackgroundImageAndText3Props) {
  return (
    <div className="h-[16px] relative shrink-0 w-full">
      <p className="absolute font-['Menlo:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#7b8aad] text-[12px] top-0 whitespace-nowrap">{text}</p>
    </div>
  );
}
type ParagraphBackgroundImageAndText5Props = {
  text: string;
  additionalClassNames?: string;
};

function ParagraphBackgroundImageAndText5({ text, additionalClassNames = "" }: ParagraphBackgroundImageAndText5Props) {
  return (
    <div className={clsx("absolute h-[16px] left-0 w-[145.25px]", additionalClassNames)}>
      <p className="absolute font-['Menlo:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#7b8aad] text-[12px] top-0 whitespace-nowrap">{text}</p>
    </div>
  );
}
type BackgroundImageAndText2Props = {
  text: string;
};

function BackgroundImageAndText2({ text }: BackgroundImageAndText2Props) {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[145.25px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-0 not-italic text-[#2f3d5e] text-[12px] top-px whitespace-nowrap">{text}</p>
    </div>
  );
}
type ParagraphBackgroundImageAndText4Props = {
  text: string;
};

function ParagraphBackgroundImageAndText4({ text }: ParagraphBackgroundImageAndText4Props) {
  return (
    <div className="h-[16px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-0 not-italic text-[#2f3d5e] text-[12px] top-px whitespace-nowrap">{text}</p>
    </div>
  );
}

function IconBackgroundImage() {
  return (
    <BackgroundImage>
      <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #BCC3D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, #BCC3D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </BackgroundImage>
  );
}
type ParagraphBackgroundImageAndText3Props = {
  text: string;
};

function ParagraphBackgroundImageAndText3({ text }: ParagraphBackgroundImageAndText3Props) {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#9ba8c2] text-[11px] top-[0.5px] tracking-[0.3395px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type BackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText1({ text, additionalClassNames = "" }: BackgroundImageAndText1Props) {
  return (
    <div className={clsx("absolute h-[24px] left-[24px] top-[88px]", additionalClassNames)}>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#1b2544] text-[16px] top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type ParagraphBackgroundImageAndText2Props = {
  text: string;
};

function ParagraphBackgroundImageAndText2({ text }: ParagraphBackgroundImageAndText2Props) {
  return (
    <div className="h-[16px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.65)] top-px whitespace-nowrap">{text}</p>
    </div>
  );
}
type ParagraphBackgroundImageAndText1Props = {
  text: string;
};

function ParagraphBackgroundImageAndText1({ text }: ParagraphBackgroundImageAndText1Props) {
  return (
    <div className="h-[28px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-white top-0 tracking-[-0.4492px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return (
    <div className="h-[28px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#1b2544] text-[18px] top-0 tracking-[-0.4395px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type NavLinkBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function NavLinkBackgroundImageAndText({ text, additionalClassNames = "" }: NavLinkBackgroundImageAndTextProps) {
  return (
    <BackgroundImage4 additionalClassNames={clsx("h-[20px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#5f6e93] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">{text}</p>
    </BackgroundImage4>
  );
}
type ParagraphBackgroundImageAndTextProps = {
  text: string;
};

function ParagraphBackgroundImageAndText({ text }: ParagraphBackgroundImageAndTextProps) {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#7b8aad] text-[11px] top-[0.5px] tracking-[0.0645px] whitespace-nowrap">{text}</p>
    </div>
  );
}

export default function IntegrateWiseLogoDesign() {
  return (
    <div className="bg-[#edf0f5] content-stretch flex items-start relative size-full" data-name="IntegrateWise Logo Design">
      <div className="bg-white h-[782px] relative shrink-0 w-[288px]" data-name="Sidebar">
        <div aria-hidden="true" className="absolute border-[#d5dae5] border-r border-solid inset-0 pointer-events-none" />
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-px relative size-full">
          <div className="h-[64px] relative shrink-0 w-[287px]" data-name="Container">
            <div aria-hidden="true" className="absolute border-[#e8ecf2] border-b border-solid inset-0 pointer-events-none" />
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[33.262px] items-center pb-px pl-[24px] relative size-full">
              <div className="h-[36px] relative shrink-0 w-[75.75px]" data-name="IntegrateWiseLogo">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
                  <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative" data-name="Image (IntegrateWise)">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                      <div className="absolute inset-[0_6.71%_1.61%_0]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70.668 35.4211">
                          <path d={svgPaths.p3fd56840} fill="var(--fill-0, #4154A3)" id="Vector" />
                        </svg>
                      </div>
                      <div className="absolute inset-[31.67%_57.15%_1.16%_26.56%]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.3397 24.1817">
                          <path d={svgPaths.p1408e440} fill="var(--fill-0, #4154A3)" id="Vector" />
                        </svg>
                      </div>
                      <div className="absolute inset-[0.05%_28.9%_33.02%_54.89%]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2833 24.094">
                          <path d={svgPaths.p345fdb80} fill="var(--fill-0, #4154A3)" id="Vector" />
                        </svg>
                      </div>
                      <div className="absolute inset-[31.44%_0.4%_32.71%_83.1%]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5018 12.9067">
                          <path d={svgPaths.pfafeb00} fill="var(--fill-0, #EB4379)" id="Vector" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[36.5px] relative shrink-0 w-[94.031px]" data-name="Container">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                  <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#1b2544] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">IntegrateWise</p>
                  </div>
                  <ParagraphBackgroundImageAndText text="Brand Store" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[1_0_0] min-h-px min-w-px relative w-[287px]" data-name="Navigation">
            <div className="overflow-clip rounded-[inherit] size-full">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pt-[16px] px-[16px] relative size-full">
                <LinkBackgroundImage additionalClassNames="bg-[#4154a3]">
                  <BackgroundImage>
                    <path d={svgPaths.p275d2400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p21a7e80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </BackgroundImage>
                  <BackgroundImage3 additionalClassNames="h-[20px] w-[60.203px]">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-white top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Overview</p>
                  </BackgroundImage3>
                </LinkBackgroundImage>
                <LinkBackgroundImage>
                  <BackgroundImage1>
                    <g clipPath="url(#clip0_37_986)" id="Icon">
                      <path d={svgPaths.p14899500} fill="var(--fill-0, #7B8AAD)" id="Vector" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.pa15a670} fill="var(--fill-0, #7B8AAD)" id="Vector_2" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p3ad59a00} fill="var(--fill-0, #7B8AAD)" id="Vector_3" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p295c7f00} fill="var(--fill-0, #7B8AAD)" id="Vector_4" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p14b85b70} id="Vector_5" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                    <defs>
                      <clipPath id="clip0_37_986">
                        <rect fill="white" height="20" width="20" />
                      </clipPath>
                    </defs>
                  </BackgroundImage1>
                  <NavLinkBackgroundImageAndText text="Brand Assets" additionalClassNames="w-[85.258px]" />
                </LinkBackgroundImage>
                <LinkBackgroundImage>
                  <BackgroundImage>
                    <path d={svgPaths.p37a07900} id="Vector" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p328d7880} id="Vector_2" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d="M5.83333 14.1667H5.84167" id="Vector_3" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p30b5e000} id="Vector_4" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </BackgroundImage>
                  <NavLinkBackgroundImageAndText text="Design Tokens" additionalClassNames="w-[94.172px]" />
                </LinkBackgroundImage>
                <LinkBackgroundImage>
                  <BackgroundImage>
                    <path d="M4.16667 18.3333H15.8333" id="Vector" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p2a47df00} id="Vector_2" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p36e14b60} id="Vector_3" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </BackgroundImage>
                  <NavLinkBackgroundImageAndText text="Stationery" additionalClassNames="w-[66.219px]" />
                </LinkBackgroundImage>
                <LinkBackgroundImage>
                  <BackgroundImage>
                    <path d={svgPaths.p3df93000} id="Vector" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p176f31c0} id="Vector_2" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </BackgroundImage>
                  <NavLinkBackgroundImageAndText text="Marketing" additionalClassNames="w-[64.445px]" />
                </LinkBackgroundImage>
                <LinkBackgroundImage>
                  <BackgroundImage1>
                    <g clipPath="url(#clip0_37_1004)" id="Icon">
                      <path d={svgPaths.p3a9a4340} id="Vector" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p9bc2a00} id="Vector_2" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p2364160} id="Vector_3" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p32312e00} id="Vector_4" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.pa6c9d80} id="Vector_5" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                    <defs>
                      <clipPath id="clip0_37_1004">
                        <rect fill="white" height="20" width="20" />
                      </clipPath>
                    </defs>
                  </BackgroundImage1>
                  <NavLinkBackgroundImageAndText text="Sales" additionalClassNames="w-[34.766px]" />
                </LinkBackgroundImage>
              </div>
            </div>
          </div>
          <div className="h-[91.5px] relative shrink-0 w-[287px]" data-name="Container">
            <div aria-hidden="true" className="absolute border-[#e8ecf2] border-solid border-t inset-0 pointer-events-none" />
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[17px] px-[16px] relative size-full">
              <div className="h-[58.5px] relative rounded-[10px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(167.079deg, rgba(65, 84, 163, 0.08) 0%, rgba(235, 67, 121, 0.08) 100%)" }}>
                <div className="content-stretch flex flex-col gap-[2px] items-start pt-[12px] px-[16px] relative size-full">
                  <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#2f3d5e] text-[12px] top-px whitespace-nowrap">Brand Store v1.0</p>
                  </div>
                  <ParagraphBackgroundImageAndText text="Brand + Marketing + Sales" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContainerBackgroundImage1 additionalClassNames="h-[782px]">
        <div className="bg-white h-[64px] relative shrink-0 w-[783px]" data-name="Header">
          <div aria-hidden="true" className="absolute border-[#d5dae5] border-b border-solid inset-0 pointer-events-none" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-px pl-[24px] relative size-full">
            <BackgroundImage3 additionalClassNames="h-[28px] w-[78.883px]">
              <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#1b2544] text-[18px] top-0 tracking-[-0.4395px] whitespace-nowrap">Overview</p>
            </BackgroundImage3>
          </div>
        </div>
        <div className="flex-[1_0_0] min-h-px min-w-px relative w-[783px]" data-name="Main Content">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
            <div className="h-[2162px] relative shrink-0 w-full" data-name="HomePage">
              <div className="content-stretch flex flex-col gap-[40px] items-start pt-[40px] px-[40px] relative size-full">
                <div className="h-[398px] overflow-clip relative rounded-[16px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(150.484deg, rgb(65, 84, 163) 0%, rgb(54, 71, 137) 50%, rgb(235, 67, 121) 100%)" }}>
                  <div className="absolute h-[398px] left-0 opacity-10 top-0 w-[703px]" data-name="Container">
                    <div className="absolute bg-[rgba(255,255,255,0.2)] left-[243.59px] rounded-[16777200px] size-[600px] top-[-199px]" data-name="Container" />
                    <div className="absolute bg-[rgba(255,255,255,0.1)] left-[-70.3px] rounded-[16777200px] size-[400px] top-[157.2px]" data-name="Container" />
                  </div>
                  <div className="absolute h-[302px] left-[48px] top-[48px] w-[607px]" data-name="Container">
                    <div className="absolute content-stretch flex gap-[16px] h-[62px] items-center left-0 top-0 w-[607px]" data-name="IntegrateWiseLogo">
                      <div className="h-[48px] relative shrink-0 w-[101.047px]" data-name="Image (IntegrateWise Icon)">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 101.047 48">
                          <g clipPath="url(#clip0_37_998)" id="Image (IntegrateWise Icon)">
                            <path d={svgPaths.p256ba1f0} fill="var(--fill-0, #4154A3)" id="Vector" />
                            <path d={svgPaths.p229f1000} fill="var(--fill-0, #4154A3)" id="Vector_2" />
                            <path d={svgPaths.p1e240600} fill="var(--fill-0, #4154A3)" id="Vector_3" />
                            <path d={svgPaths.p23494800} fill="var(--fill-0, #EB4379)" id="Vector_4" />
                          </g>
                          <defs>
                            <clipPath id="clip0_37_998">
                              <rect fill="white" height="48" width="101.047" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="h-[62px] relative shrink-0 w-[419.211px]" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
                          <div className="flex-[1_0_0] min-h-px min-w-px relative w-[419.211px]" data-name="Heading 1">
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                              <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] min-h-px min-w-px not-italic relative text-[30px] text-white tracking-[-0.3545px]">IntegrateWise</p>
                            </div>
                          </div>
                          <BackgroundImage2 additionalClassNames="w-[419.211px]">
                            <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.8)] top-[-0.5px] tracking-[0.0875px] whitespace-nowrap">Knowledge Workspace Empowered by AI and the Spine</p>
                          </BackgroundImage2>
                        </div>
                      </div>
                    </div>
                    <div className="absolute content-stretch flex flex-col gap-[8px] h-[116px] items-start left-0 top-[86px] w-[576px]" data-name="Container">
                      <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full" data-name="Heading 2">
                        <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[36px] min-h-px min-w-px not-italic relative text-[30px] text-white tracking-[0.3955px]">Brand Store</p>
                      </div>
                      <div className="h-[72px] relative shrink-0 w-full" data-name="Paragraph">
                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.75)] top-[-0.5px] tracking-[-0.3125px] w-[527px]">Your centralized hub for brand assets, corporate stationery, marketing collateral, and sales enablement materials. Everything to represent IntegrateWise consistently across legal, finance, product, and marketing.</p>
                      </div>
                    </div>
                    <div className="absolute h-[68px] left-0 top-[234px] w-[607px]" data-name="Container">
                      <div className="absolute bg-[rgba(255,255,255,0.15)] content-stretch flex gap-[12px] h-[68px] items-center left-0 px-[20px] rounded-[10px] top-0 w-[140.711px]" data-name="Container">
                        <BackgroundImage>
                          <path d={svgPaths.p3053b100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.66667" />
                          <path d={svgPaths.p37dcb700} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.66667" />
                          <path d="M10 12.5V2.5" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.66667" />
                        </BackgroundImage>
                        <ContainerBackgroundImage1 additionalClassNames="h-[44px]">
                          <ParagraphBackgroundImageAndText1 text="45+" />
                          <ParagraphBackgroundImageAndText2 text="Total Assets" />
                        </ContainerBackgroundImage1>
                      </div>
                      <div className="absolute bg-[rgba(255,255,255,0.15)] content-stretch flex gap-[12px] h-[68px] items-center left-[156.71px] px-[20px] rounded-[10px] top-0 w-[130.125px]" data-name="Container">
                        <BackgroundImage>
                          <path d={svgPaths.p3713e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.66667" />
                          <path d={svgPaths.pd2076c0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.66667" />
                          <path d="M8.33333 7.5H6.66667" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.66667" />
                          <path d="M13.3333 10.8333H6.66667" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.66667" />
                          <path d="M13.3333 14.1667H6.66667" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.66667" />
                        </BackgroundImage>
                        <ContainerBackgroundImage1 additionalClassNames="h-[44px]">
                          <ParagraphBackgroundImageAndText1 text="26" />
                          <ParagraphBackgroundImageAndText2 text="Templates" />
                        </ContainerBackgroundImage1>
                      </div>
                      <div className="absolute bg-[rgba(255,255,255,0.15)] content-stretch flex gap-[12px] h-[68px] items-center left-[302.84px] px-[20px] rounded-[10px] top-0 w-[133.414px]" data-name="Container">
                        <BackgroundImage>
                          <path d={svgPaths.p47d9b00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.66667" />
                          <path d={svgPaths.p1f342980} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.66667" />
                          <path d={svgPaths.p34a08500} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.66667" />
                        </BackgroundImage>
                        <ContainerBackgroundImage1 additionalClassNames="h-[44px]">
                          <ParagraphBackgroundImageAndText1 text="5" />
                          <ParagraphBackgroundImageAndText2 text="Categories" />
                        </ContainerBackgroundImage1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white h-[291px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
                  <div aria-hidden="true" className="absolute border border-[#d5dae5] border-solid inset-0 pointer-events-none rounded-[14px]" />
                  <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[33px] px-[33px] relative size-full">
                    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
                      <BackgroundImage>
                        <path d={svgPaths.p28150300} id="Vector" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p8bc2f80} id="Vector_2" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </BackgroundImage>
                      <BackgroundImage2 additionalClassNames="w-[262.266px]">
                        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#1b2544] text-[16px] top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Brand Positioning Quick Reference</p>
                      </BackgroundImage2>
                    </div>
                    <div className="h-[185px] relative shrink-0 w-full" data-name="Container">
                      <div className="absolute content-stretch flex flex-col gap-[4px] h-[80.5px] items-start left-0 top-0 w-[196.328px]" data-name="Container">
                        <ParagraphBackgroundImageAndText3 text="CORE DESCRIPTOR" />
                        <div className="h-[60px] relative shrink-0 w-full" data-name="Paragraph">
                          <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#2f3d5e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[168px]">Knowledge Workspace Empowered by AI and the Spine</p>
                        </div>
                      </div>
                      <div className="absolute content-stretch flex flex-col gap-[4px] h-[80.5px] items-start left-[220.33px] top-0 w-[196.336px]" data-name="Container">
                        <ParagraphBackgroundImageAndText3 text="PRIMARY TAGLINE" />
                        <div className="h-[40px] relative shrink-0 w-full" data-name="Paragraph">
                          <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#2f3d5e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[176px]">AI Thinks in Context — and Waits for Approval</p>
                        </div>
                      </div>
                      <div className="absolute content-stretch flex flex-col gap-[4px] h-[80.5px] items-start left-[440.66px] top-0 w-[196.328px]" data-name="Container">
                        <ParagraphBackgroundImageAndText3 text="SHORT VERSION" />
                        <div className="h-[40px] relative shrink-0 w-full" data-name="Paragraph">
                          <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#2f3d5e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[189px]">Context-Aware AI. Approval-Controlled Work.</p>
                        </div>
                      </div>
                      <div className="absolute content-stretch flex flex-col gap-[4px] h-[80.5px] items-start left-0 top-[104.5px] w-[636.992px]" data-name="Container">
                        <ParagraphBackgroundImageAndText3 text="PRODUCT ESSENCE" />
                        <div className="h-[60px] relative shrink-0 w-full" data-name="Paragraph">
                          <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#475578] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[627px]">IntegrateWise is a knowledge workspace where the Spine becomes the single source of truth and AI operates on top of that context — thinking, proposing, and learning while every action remains under human approval.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[16px] h-[572px] items-start relative shrink-0 w-full" data-name="Container">
                  <BackgroundImageAndText text="Browse Categories" />
                  <div className="h-[528px] relative shrink-0 w-full" data-name="Container">
                    <div className="absolute bg-white border border-[#d5dae5] border-solid h-[242px] left-0 rounded-[14px] top-0 w-[218.328px]" data-name="Button">
                      <div className="absolute content-stretch flex h-[48px] items-start justify-between left-[24px] top-[24px] w-[168.328px]" data-name="Container">
                        <ContainerBackgroundImage2 additionalClassNames="bg-[rgba(65,84,163,0.07)]">
                          <IconBackgroundImage1>
                            <path d={svgPaths.p2476dfc0} fill="var(--fill-0, #4154A3)" id="Vector" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d={svgPaths.pf6f2500} fill="var(--fill-0, #4154A3)" id="Vector_2" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d={svgPaths.p2f047a30} fill="var(--fill-0, #4154A3)" id="Vector_3" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d={svgPaths.p7aea480} fill="var(--fill-0, #4154A3)" id="Vector_4" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d={svgPaths.p3eb1d9c0} id="Vector_5" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          </IconBackgroundImage1>
                        </ContainerBackgroundImage2>
                        <IconBackgroundImage />
                      </div>
                      <BackgroundImageAndText1 text="Brand Assets" additionalClassNames="w-[168.328px]" />
                      <div className="absolute h-[60px] left-[24px] top-[116px] w-[168.328px]" data-name="Paragraph">
                        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#7b8aad] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[165px]">Logo system, brand messaging, taglines, and visual identity guidelines</p>
                      </div>
                      <div className="absolute content-stretch flex h-[24px] items-center left-[24px] top-[192px] w-[168.328px]" data-name="Container">
                        <BackgroundImage2 additionalClassNames="bg-[rgba(65,84,163,0.07)] rounded-[16777200px] w-[68.328px]">
                          <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#4154a3] text-[12px] top-[5px] whitespace-nowrap">5 assets</p>
                        </BackgroundImage2>
                      </div>
                    </div>
                    <div className="absolute bg-white border border-[#d5dae5] border-solid h-[242px] left-[242.33px] rounded-[14px] top-0 w-[218.336px]" data-name="Button">
                      <div className="absolute content-stretch flex h-[48px] items-start justify-between left-[24px] top-[24px] w-[168.336px]" data-name="Container">
                        <ContainerBackgroundImage2 additionalClassNames="bg-[rgba(107,125,196,0.07)]">
                          <IconBackgroundImage1>
                            <path d={svgPaths.p3703cd00} id="Vector" stroke="var(--stroke-0, #6B7DC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d={svgPaths.p38916900} id="Vector_2" stroke="var(--stroke-0, #6B7DC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d="M7 17H7.01" id="Vector_3" stroke="var(--stroke-0, #6B7DC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d={svgPaths.p1ee88100} id="Vector_4" stroke="var(--stroke-0, #6B7DC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          </IconBackgroundImage1>
                        </ContainerBackgroundImage2>
                        <IconBackgroundImage />
                      </div>
                      <BackgroundImageAndText1 text="Design Tokens" additionalClassNames="w-[168.336px]" />
                      <div className="absolute h-[60px] left-[24px] top-[116px] w-[168.336px]" data-name="Paragraph">
                        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#7b8aad] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[163px]">Colors, typography, spacing, and component foundations</p>
                      </div>
                      <div className="absolute content-stretch flex h-[24px] items-center left-[24px] top-[192px] w-[168.336px]" data-name="Container">
                        <BackgroundImage2 additionalClassNames="bg-[rgba(107,125,196,0.07)] rounded-[16777200px] w-[107.117px]">
                          <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#6b7dc4] text-[12px] top-[5px] whitespace-nowrap">8 token groups</p>
                        </BackgroundImage2>
                      </div>
                    </div>
                    <div className="absolute bg-white border border-[#d5dae5] border-solid h-[242px] left-[484.66px] rounded-[14px] top-0 w-[218.328px]" data-name="Button">
                      <div className="absolute content-stretch flex h-[48px] items-start justify-between left-[24px] top-[24px] w-[168.328px]" data-name="Container">
                        <ContainerBackgroundImage2 additionalClassNames="bg-[rgba(54,71,137,0.07)]">
                          <IconBackgroundImage1>
                            <path d="M5 22H19" id="Vector" stroke="var(--stroke-0, #364789)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d={svgPaths.p3a093900} id="Vector_2" stroke="var(--stroke-0, #364789)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d={svgPaths.p31de2eb0} id="Vector_3" stroke="var(--stroke-0, #364789)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          </IconBackgroundImage1>
                        </ContainerBackgroundImage2>
                        <IconBackgroundImage />
                      </div>
                      <BackgroundImageAndText1 text="Stationery" additionalClassNames="w-[168.328px]" />
                      <div className="absolute h-[60px] left-[24px] top-[116px] w-[168.328px]" data-name="Paragraph">
                        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#7b8aad] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[159px]">Letterhead, invoice, proposal, seal, business card, email signature</p>
                      </div>
                      <div className="absolute content-stretch flex h-[24px] items-center left-[24px] top-[192px] w-[168.328px]" data-name="Container">
                        <BackgroundImage2 additionalClassNames="bg-[rgba(54,71,137,0.07)] rounded-[16777200px] w-[88.68px]">
                          <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#364789] text-[12px] top-[5px] whitespace-nowrap">8 templates</p>
                        </BackgroundImage2>
                      </div>
                    </div>
                    <div className="absolute bg-white border border-[#d5dae5] border-solid h-[262px] left-0 rounded-[14px] top-[266px] w-[218.328px]" data-name="Button">
                      <div className="absolute content-stretch flex h-[48px] items-start justify-between left-[24px] top-[24px] w-[168.328px]" data-name="Container">
                        <ContainerBackgroundImage2 additionalClassNames="bg-[rgba(235,67,121,0.07)]">
                          <IconBackgroundImage1>
                            <path d="M3 11L21 6V18L3 14V11Z" id="Vector" stroke="var(--stroke-0, #EB4379)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d={svgPaths.paa5e400} id="Vector_2" stroke="var(--stroke-0, #EB4379)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          </IconBackgroundImage1>
                        </ContainerBackgroundImage2>
                        <IconBackgroundImage />
                      </div>
                      <BackgroundImageAndText1 text="Marketing" additionalClassNames="w-[168.328px]" />
                      <div className="absolute h-[80px] left-[24px] top-[116px] w-[168.328px]" data-name="Paragraph">
                        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#7b8aad] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[147px]">Social templates, LinkedIn assets, WhatsApp catalog, marketing one-pagers</p>
                      </div>
                      <div className="absolute content-stretch flex h-[24px] items-center left-[24px] top-[212px] w-[168.328px]" data-name="Container">
                        <BackgroundImage2 additionalClassNames="bg-[rgba(235,67,121,0.07)] rounded-[16777200px] w-[106.828px]">
                          <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#eb4379] text-[12px] top-[5px] whitespace-nowrap">14 deliverables</p>
                        </BackgroundImage2>
                      </div>
                    </div>
                    <div className="absolute bg-white border border-[#d5dae5] border-solid h-[262px] left-[242.33px] rounded-[14px] top-[266px] w-[218.336px]" data-name="Button">
                      <div className="absolute content-stretch flex h-[48px] items-start justify-between left-[24px] top-[24px] w-[168.336px]" data-name="Container">
                        <ContainerBackgroundImage2 additionalClassNames="bg-[rgba(208,53,104,0.07)]">
                          <IconBackgroundImage1>
                            <path d={svgPaths.p17418b80} id="Vector" stroke="var(--stroke-0, #D03568)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d={svgPaths.p3de716e0} id="Vector_2" stroke="var(--stroke-0, #D03568)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d="M2 16L8 22" id="Vector_3" stroke="var(--stroke-0, #D03568)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d={svgPaths.p3ceac080} id="Vector_4" stroke="var(--stroke-0, #D03568)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d={svgPaths.p286dd280} id="Vector_5" stroke="var(--stroke-0, #D03568)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          </IconBackgroundImage1>
                        </ContainerBackgroundImage2>
                        <IconBackgroundImage />
                      </div>
                      <BackgroundImageAndText1 text="Sales" additionalClassNames="w-[168.336px]" />
                      <div className="absolute h-[80px] left-[24px] top-[116px] w-[168.336px]" data-name="Paragraph">
                        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#7b8aad] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[166px]">Pitch decks, one-pagers, case studies, battlecards, and proposals</p>
                      </div>
                      <div className="absolute content-stretch flex h-[24px] items-center left-[24px] top-[212px] w-[168.336px]" data-name="Container">
                        <BackgroundImage2 additionalClassNames="bg-[rgba(208,53,104,0.07)] rounded-[16777200px] w-[106.703px]">
                          <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#d03568] text-[12px] top-[5px] whitespace-nowrap">10 deliverables</p>
                        </BackgroundImage2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[16px] h-[271px] items-start relative shrink-0 w-full" data-name="Container">
                  <BackgroundImageAndText text="Official Contact System" />
                  <div className="bg-white h-[227px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[#d5dae5] border-solid inset-0 pointer-events-none rounded-[14px]" />
                    <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
                      <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[56px] relative shrink-0 w-full" data-name="Container">
                        <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
                          <BackgroundImageAndText2 text="General" />
                          <ParagraphBackgroundImageAndText5 text="info@integratewise.co" additionalClassNames="top-[24px]" />
                          <ParagraphBackgroundImageAndText5 text="connect@integratewise.co" additionalClassNames="top-[40px]" />
                        </div>
                        <div className="col-2 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
                          <BackgroundImageAndText2 text="Sales" />
                          <ParagraphBackgroundImageAndText5 text="sales@integratewise.co" additionalClassNames="top-[24px]" />
                          <ParagraphBackgroundImageAndText5 text="sales@integratewise.ai" additionalClassNames="top-[40px]" />
                        </div>
                        <div className="col-3 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
                          <BackgroundImageAndText2 text="Support" />
                          <ParagraphBackgroundImageAndText5 text="support@integratewise.co" additionalClassNames="top-[24px]" />
                          <ParagraphBackgroundImageAndText5 text="support@integratewise.ai" additionalClassNames="top-[40px]" />
                        </div>
                        <div className="col-4 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
                          <BackgroundImageAndText2 text="Billing" />
                          <ParagraphBackgroundImageAndText5 text="billing@integratewise.co" additionalClassNames="top-[24px]" />
                          <ParagraphBackgroundImageAndText5 text="billing@integratewise.ai" additionalClassNames="top-[40px]" />
                        </div>
                      </div>
                      <div className="h-[105px] relative shrink-0 w-full" data-name="Container">
                        <div aria-hidden="true" className="absolute border-[#e8ecf2] border-solid border-t inset-0 pointer-events-none" />
                        <div className="absolute content-stretch flex flex-col h-[32px] items-start left-0 top-[17px] w-[187.844px]" data-name="Container">
                          <ParagraphBackgroundImageAndText4 text="Marketing" />
                          <BackgroundImageAndText3 text="marketing@integratewise.co" />
                        </div>
                        <div className="absolute content-stretch flex flex-col h-[32px] items-start left-[211.84px] top-[17px] w-[173.391px]" data-name="Container">
                          <ParagraphBackgroundImageAndText4 text="Careers" />
                          <BackgroundImageAndText3 text="careers@integratewise.co" />
                        </div>
                        <div className="absolute content-stretch flex flex-col h-[32px] items-start left-[409.23px] top-[17px] w-[180.617px]" data-name="Container">
                          <ParagraphBackgroundImageAndText4 text="Security" />
                          <BackgroundImageAndText3 text="security@integratewise.co" />
                        </div>
                        <div className="absolute content-stretch flex flex-col h-[32px] items-start left-0 top-[73px] w-[115.594px]" data-name="Container">
                          <ParagraphBackgroundImageAndText4 text="Website" />
                          <BackgroundImageAndText3 text="integratewise.ai" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[16px] h-[390px] items-start relative shrink-0 w-full" data-name="Container">
                  <BackgroundImageAndText text="Recent Updates" />
                  <div className="bg-white h-[346px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[#d5dae5] border-solid inset-0 pointer-events-none rounded-[14px]" />
                    <div className="content-stretch flex flex-col items-start p-px relative size-full">
                      <ContainerBackgroundImage>
                        <div className="bg-[#4154a3] rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />
                        <ContainerBackgroundImage1 additionalClassNames="h-[36px]">
                          <ParagraphBackgroundImageAndText6 text="Logo Mark v2 Updated" />
                          <ParagraphBackgroundImageAndText7 text="Brand Assets" />
                        </ContainerBackgroundImage1>
                        <TextBackgroundImageAndText text="Mar 14, 2026" additionalClassNames="w-[74.555px]" />
                      </ContainerBackgroundImage>
                      <ContainerBackgroundImage>
                        <div className="bg-[#364789] rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />
                        <ContainerBackgroundImage1 additionalClassNames="h-[36px]">
                          <ParagraphBackgroundImageAndText6 text="Corporate Stationery Suite Published" />
                          <ParagraphBackgroundImageAndText7 text="Stationery" />
                        </ContainerBackgroundImage1>
                        <TextBackgroundImageAndText text="Mar 13, 2026" additionalClassNames="w-[74.359px]" />
                      </ContainerBackgroundImage>
                      <ContainerBackgroundImage>
                        <div className="bg-[#d03568] rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />
                        <ContainerBackgroundImage1 additionalClassNames="h-[36px]">
                          <ParagraphBackgroundImageAndText6 text="Q1 Sales Deck Published" />
                          <ParagraphBackgroundImageAndText7 text="Sales" />
                        </ContainerBackgroundImage1>
                        <TextBackgroundImageAndText text="Mar 12, 2026" additionalClassNames="w-[74.313px]" />
                      </ContainerBackgroundImage>
                      <ContainerBackgroundImage>
                        <div className="bg-[#eb4379] rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />
                        <ContainerBackgroundImage1 additionalClassNames="h-[36px]">
                          <BackgroundImage5>{`LinkedIn & WhatsApp Assets Added`}</BackgroundImage5>
                          <ParagraphBackgroundImageAndText7 text="Marketing" />
                        </ContainerBackgroundImage1>
                        <TextBackgroundImageAndText text="Mar 10, 2026" additionalClassNames="w-[74.336px]" />
                      </ContainerBackgroundImage>
                      <div className="h-[68px] relative shrink-0 w-full" data-name="Container">
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[16px] items-center px-[24px] relative size-full">
                            <div className="bg-[#6b7dc4] rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />
                            <ContainerBackgroundImage1 additionalClassNames="h-[36px]">
                              <ParagraphBackgroundImageAndText6 text="Design Tokens v1.0 Finalized" />
                              <ParagraphBackgroundImageAndText7 text="Design Tokens" />
                            </ContainerBackgroundImage1>
                            <TextBackgroundImageAndText text="Mar 8, 2026" additionalClassNames="w-[68.93px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerBackgroundImage1>
    </div>
  );
}