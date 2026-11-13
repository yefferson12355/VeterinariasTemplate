import Link from "next/link"
import { getBusinessHours } from "@/actions/availability"

import { siteConfig } from "@/config/site"
import { type BusinessHours } from "@/db/schema"
import { DAY_MAPPINGS, DAYS_OF_WEEK } from "@/data/constants"

interface FooterProps {
  address: string
  phone_1: string
  phone_2: string
}

export async function Footer({
  address,
  phone_1,
  phone_2,
}: FooterProps): Promise<JSX.Element> {
  const businessHours = await getBusinessHours()
  const DAYS_OF_WEEK_REARRANGED = [...DAYS_OF_WEEK.slice(1), DAYS_OF_WEEK[0]]

  console.log("Business Hours: ", businessHours)

  return (
    <footer
      className="w-full max-w-[2560px] bg-peach bg-[url('/images/svg/team-section-background.svg')] bg-cover bg-center bg-no-repeat text-lightSectionText"
      id="footer"
    >
      <div className="w-full">
        <img
          src="/images/svg/footer-top-wave.svg"
          className=""
          alt="Footer top wave pattern"
        />
      </div>

      <div className="mx-auto mt-9 w-full max-w-[1440px] px-5 md:px-6 lg:px-7 xl:mt-6">
        <div className="flex flex-col-reverse items-center gap-16 md:grid md:grid-cols-2 md:gap-6 xl:h-[560px]">
          <div className="flex h-full flex-col items-center justify-center w-1400:px-[194px]">
            <h2 className="mb-6 bg-gradient-to-br from-greenGradientFrom to-greenGradientTo bg-clip-text text-center font-[BalooTamma] font-bold leading-[1.05] xl:mb-[42px]">
              <span className="whitespace-nowrap text-[22vw] text-transparent md:text-[5.8vw] w-1400:text-[96px]">
                Datos
              </span>
              <br />
              <span className="text-[9vw] text-transparent md:whitespace-nowrap md:text-[3.71vw] w-1400:text-[40px]">
                de contacto
              </span>
            </h2>

            <div className="flex flex-col gap-4 px-[16%] xl:px-0">
              <p className="text-center text-[5.6vw] font-extrabold md:px-[16%] md:text-[1.8vw] w-1400:text-[16px]">
                Clínica veterinaria {siteConfig.nameShort}
              </p>

              <div className="text-center text-[4.8vw] md:text-[1.7vw] w-1400:text-[18px]">
                
                <p>Dr. Francisco Miguel</p>
              </div>

              <div className="text-center text-[4.8vw] md:text-[1.7vw] w-1400:text-[18px]">
                <p>ul. {address.split(",")[0]}</p>
                <p>{address.split(",")[1]}</p>
              </div>

              <div className="mt-2 flex flex-col items-center justify-center gap-1 text-center text-[4.8vw] font-extrabold md:text-[1.7vw] w-1400:text-[18px]">
                <p>kom. {phone_1}</p>
                <p>tel. {phone_2}</p>
              </div>
            </div>
          </div>

          <div className="flex size-full flex-col items-center justify-center px-[10%] md:mt-[-38px] md:px-[16%] w-1400:px-[194px]">
            <h2 className="mb-6 bg-gradient-to-br from-greenGradientFrom to-greenGradientTo bg-clip-text text-center font-[BalooTamma] font-bold leading-[1.05] xl:mb-[42px]">
              <span className="whitespace-nowrap text-[16vw] text-transparent md:text-[5.8vw] w-1400:text-[80px]">
                Horarios
              </span>
              <br />
              <span className="text-[14.6vw] text-transparent md:whitespace-nowrap md:text-[3.71vw] w-1400:text-[72px]">
                de atención
              </span>
            </h2>

            <div className="grid w-full grid-cols-2 justify-between text-[4.8vw] md:text-[1.7vw] w-1400:text-[18px]">
              <div className="flex flex-col gap-2 font-extrabold">
                {DAYS_OF_WEEK_REARRANGED.map((day) => (
                  <span key={day}>
                    {DAY_MAPPINGS[day as keyof typeof DAY_MAPPINGS]}
                  </span>
                ))}
              </div>

              <div className="flex flex-col items-end gap-2">
                {DAYS_OF_WEEK_REARRANGED.map((day) => (
                  <div key={day}>
                    {(() => {
                      const periods = businessHours
                        ? businessHours[
                            `${day}Periods` as keyof BusinessHours
                          ]
                        : undefined
                      const firstPeriod = Array.isArray(periods)
                        ? periods[0]
                        : undefined

                      return firstPeriod &&
                        typeof firstPeriod === "object" &&
                        "opening" in firstPeriod &&
                        "closing" in firstPeriod ? (
                      <div>
                        {String(firstPeriod.opening)}{" "}
                        -{" "}
                        {String(firstPeriod.closing)}
                      </div>
                      ) : (
                      <div className="uppercase">cerrado</div>
                      )
                    })()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-full border-DEFAULT border-black bg-black opacity-20" />
       
        </div>
      </div>
    </footer>
  )
}
