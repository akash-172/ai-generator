import { useState } from "react";

const GenerateAudio = () => {
  const [form, setForm] = useState({
    voice: "alloy",
    prompt: "",
  });
  const [audioUrl, setAudioUrl] = useState(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [audioBlob, setAudioBlob] = useState(null);

  const [error, setError] = useState(false);

  const voices = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"];

  const generateAudio = async () => {
    console.log("form -------------------------->", form);
    if (form.prompt) {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/api/v1/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        console.log(response);

        if (!response.ok) {
          setError(true);
          throw new Error(`Error fetching audio: ${response.status}`);
        }

        const data = await response.json();
        const audioUrl = data.audioUrl;
        setAudioUrl(audioUrl);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Generate</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Convert text to speech in three different voices
        </p>
      </div>

      <form className="mt-10 max-w-3xl">
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="voice">Voice</label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
            name="voice"
            id="voice"
            onChange={handleChange}
          >
            {voices.map((voice, idx) => (
              <option key={idx} value={voice}>
                {voice[0].toUpperCase() + voice.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="prompt">Prompt</label>
          <textarea
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
            name="prompt"
            id="prompt"
            cols="20"
            rows="5"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <p className="text-red-600 p-2 border-2 my-2 rounded-lg">
            Error generating the audio
          </p>
        ) : (
          ""
        )}
        <button
          type="button"
          onClick={generateAudio}
          className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>

        {audioUrl && (
          <div className="mt-4">
            <audio className="bg-blue-100 w-full sm:w-auto" controls>
              <source src={audioUrl} type="audio/mp3" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        )}
      </form>
    </section>
  );
};

export default GenerateAudio;
