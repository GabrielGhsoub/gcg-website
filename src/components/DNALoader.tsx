import { motion } from "framer-motion";

/**
 * DNA Double Helix Loading Animation
 * Pure CSS animation with navy/gold base pairs
 * Science Easter egg #1
 */
export default function DNALoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-navy">
      <div className="relative h-64 w-32">
        {/* DNA helix strands */}
        <div className="dna-helix">
          {/* Generate base pairs */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="base-pair"
              style={{
                top: `${i * 8}%`,
                animationDelay: `${i * 0.1}s`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              {/* Left nucleotide */}
              <div className="nucleotide nucleotide-left" />
              {/* Base pair connection */}
              <div className="connection" />
              {/* Right nucleotide */}
              <div className="nucleotide nucleotide-right" />
            </motion.div>
          ))}
        </div>

        {/* Loading text */}
        <motion.div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gold text-sm font-medium tracking-wide">
            Loading...
          </p>
        </motion.div>
      </div>

      <style>{`
        .dna-helix {
          position: relative;
          width: 100%;
          height: 100%;
          animation: dna-rotate 3s linear infinite;
        }

        @keyframes dna-rotate {
          0% {
            transform: perspective(600px) rotateY(0deg);
          }
          100% {
            transform: perspective(600px) rotateY(360deg);
          }
        }

        .base-pair {
          position: absolute;
          width: 100%;
          height: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          animation: base-pulse 2s ease-in-out infinite;
        }

        @keyframes base-pulse {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }

        .nucleotide {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: 0 0 8px currentColor;
        }

        .nucleotide-left {
          background: #000040; /* Navy */
          border: 2px solid #c9a84c; /* Gold */
        }

        .nucleotide-right {
          background: #c9a84c; /* Gold */
          border: 2px solid #000040; /* Navy */
        }

        .connection {
          flex: 1;
          height: 2px;
          background: linear-gradient(
            to right,
            #c9a84c 0%,
            rgba(201, 168, 76, 0.5) 50%,
            #c9a84c 100%
          );
          margin: 0 4px;
          opacity: 0.6;
        }

        /* Adjust animation for individual pairs to create helix effect */
        .base-pair:nth-child(1) { animation-delay: 0s; }
        .base-pair:nth-child(2) { animation-delay: 0.1s; }
        .base-pair:nth-child(3) { animation-delay: 0.2s; }
        .base-pair:nth-child(4) { animation-delay: 0.3s; }
        .base-pair:nth-child(5) { animation-delay: 0.4s; }
        .base-pair:nth-child(6) { animation-delay: 0.5s; }
        .base-pair:nth-child(7) { animation-delay: 0.6s; }
        .base-pair:nth-child(8) { animation-delay: 0.7s; }
        .base-pair:nth-child(9) { animation-delay: 0.8s; }
        .base-pair:nth-child(10) { animation-delay: 0.9s; }
        .base-pair:nth-child(11) { animation-delay: 1s; }
        .base-pair:nth-child(12) { animation-delay: 1.1s; }
      `}</style>
    </div>
  );
}
