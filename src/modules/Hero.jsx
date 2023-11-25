import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import { AnimatePresence, motion } from "framer-motion";
import "swiper/css";

function Hero({ parks }) {
  const swiperRef = useRef();

  const [activeSlide, setActiveSlide] = useState(0);

  const timeLimit = 10000; // ms
  const [currentTime, setCurrentTime] = useState(0);
  const [disableSlideInterval, setDisableSlideInterval] = useState(false);

  useEffect(() => {
    if (disableSlideInterval) return;
    const interval = setInterval(() => {
      setCurrentTime((time) => {
        if (time + 1000 >= timeLimit) {
          setActiveSlide((slide) => {
            return (slide + 1) % parks.length;
          });
        }

        return time + 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disableSlideInterval]);

  useEffect(() => {
    setCurrentTime(0);
    swiperRef.current.swiper.slideTo(activeSlide);
  }, [activeSlide]);

  return (
    <section className="h-screen flex">
      <div className="h-full w-full relative overflow-hidden z-[1]">
        <Swiper
          ref={swiperRef}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          slidesPerView={1}
          modules={[Navigation, EffectFade]}
          className="absolute inset-0 z-10"
          pagination={{ clickable: true }}
        >
          <ImageGradientOverlays park={parks[activeSlide]} />
          <TextContent
            parks={parks}
            activeSlide={activeSlide}
            currentTime={currentTime}
            timeLimit={timeLimit}
            disableSlideInterval={disableSlideInterval}
          />

          {parks.map((park) => (
            <SwiperSlide
              key={park.id}
              className="w-full h-full transition-opacity !duration-[1200ms]"
            >
              <img
                src={park.image}
                className="object-cover w-full h-full contrast-125"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Controls
          parks={parks}
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
          currentTime={currentTime}
          timeLimit={timeLimit}
          setDisableSlideInterval={setDisableSlideInterval}
        />
      </div>
      <div
        style={{
          clipPath:
            "polygon(0% 0%, 100% 0%, 100% 100%, 70% calc(100% - 20px), 30% calc(100% - 20px), 0% 100%)",
        }}
        className="h-20 bg-slate-900 -mt-20 z-[0] relative bottom-0 left-0 right-0"
      />
    </section>
  );
}

function ImageGradientOverlays({ park }) {
  return (
    <>
      {/* Left black gradient */}
      <div className="bg-gradient-to-r absolute left-0 top-0 bottom-0 w-1/2 from-black/50 z-20" />

      {/* Right radial gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={park.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeOut", duration: 0.6 }}
          style={{
            background: `radial-gradient(circle 80vw at right bottom, ${park?.color} 0, transparent 80%)`,
          }}
          className="absolute inset-0 bottom-0 z-20"
        />
      </AnimatePresence>

      {/* Lower pagination controls gradient */}
      <div className="bg-gradient-to-t from-black absolute bottom-0 left-0 right-0 h-32 z-10" />

      {/* General image overlay */}
      <div className="absolute inset-0 bg-slate-900 opacity-30 z-10" />
    </>
  );
}

function TextContent({
  parks,
  activeSlide,
  currentTime,
  timeLimit,
  disableSlideInterval,
}) {
  const clipthingLength = "80px";
  const clipthingHeight = "10px";
  const clipthingThickness = "2px";

  return (
    <div className="absolute inset-0 z-20 flex items-center container">
      <div className="relative text-slate-200 p-8">
        <div
          style={{
            clipPath: `polygon(0px 0px, ${clipthingLength} 0px, ${clipthingLength} ${clipthingThickness}, ${clipthingThickness} ${clipthingThickness}, ${clipthingThickness} ${clipthingHeight}, 0px ${clipthingHeight})`,
          }}
          className="absolute inset-0 bg-gradient-to-r from-slate-300"
        />
        <div
          style={{
            clipPath: `polygon(100% calc(100% - ${clipthingHeight}), 100% 100%, calc(100% - ${clipthingLength}) 100%, calc(100% - ${clipthingLength}) calc(100% - ${clipthingThickness}), calc(100% - ${clipthingThickness}) calc(100% - ${clipthingThickness}), calc(100% - ${clipthingThickness}) calc(100% - ${clipthingHeight}))`,
          }}
          className="absolute inset-0 bg-gradient-to-l from-slate-300"
        />
        <div className="relative z-10">
          <p className="text-6xl relative w-fit -left-1">
            Besök
            <motion.span className="absolute left-[calc(100%+1rem)] ">
              <AnimatePresence mode="wait">
                <motion.span
                  key={parks[activeSlide].id}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: -5,
                  }}
                  className="uppercase inline-block bg-gradient-to-r bg-clip-text text-transparent from-yellow-400 to-yellow-300 whitespace-nowrap"
                >
                  {parks[activeSlide].name}
                </motion.span>
              </AnimatePresence>
              <motion.span className="h-1 mt-4 w-full absolute bottom-0 left-0 right-0 overflow-hidden">
                <AnimatePresence>
                  <motion.span
                    key={parks[activeSlide].id}
                    initial={{ width: "0%", opacity: 0 }}
                    animate={{
                      width: `${(currentTime / timeLimit) * 100}%`,
                      opacity: 1,
                    }}
                    transition={{
                      width: { ease: "linear", duration: 1 },
                      opacity: { ease: "linear", duration: 0.6 },
                    }}
                    exit={{
                      width: disableSlideInterval ? "0%" : "100%",
                      opacity: 0,
                    }}
                    className="bg-yellow-400 h-full rounded-full absolute inset-0"
                  />
                </AnimatePresence>
              </motion.span>
            </motion.span>
          </p>
          <p className="mt-8 text-lg text-slate-100 relative">
            en av Sveriges{" "}
            <span className="font-semibold">vackra nationalparker</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Controls({
  parks,
  activeSlide,
  setActiveSlide,
  setDisableSlideInterval,
}) {
  return (
    <div className="absolute bottom-10 left-0 right-0 z-30 w-fit mx-auto">
      <div className="flex gap-8">
        {parks.map((park, i) => (
          <button
            key={park.id}
            onClick={() => {
              setActiveSlide(i);
              setDisableSlideInterval(true);
            }}
            className={`w-3 h-3 rounded-full block transition-all cursor-pointer ${
              activeSlide === i
                ? "bg-slate-200 hover:bg-slate-200 scale-125"
                : "bg-slate-400/50 hover:bg-slate-300/80"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Hero;
