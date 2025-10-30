import React, { useState, FormEvent } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { BohrElementData } from '../types';
import BohrDiagram from './BohrDiagram';

const BohrDiagramGenerator: React.FC = () => {
    const [elementInput, setElementInput] = useState<string>('Carbon');
    const [bohrData, setBohrData] = useState<BohrElementData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (e: FormEvent) => {
        e.preventDefault();
        const trimmedInput = elementInput.trim();
        if (!trimmedInput) {
            setError("Please enter an element name, symbol, or atomic number.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setBohrData(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            // Step 1: Validate if the input is a real element
            const validationSchema = {
                type: Type.OBJECT,
                properties: {
                    isValid: { type: Type.BOOLEAN, description: "Whether the input corresponds to a valid chemical element." },
                    canonicalName: { type: Type.STRING, description: "The canonical name of the element (e.g., 'Carbon', 'Hydrogen'). Returns an empty string if not valid." }
                },
                required: ['isValid', 'canonicalName']
            };

            const validationResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Is "${trimmedInput}" a valid chemical element from the periodic table? If so, provide its canonical name.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: validationSchema,
                }
            });

            const validationResult = JSON.parse(validationResponse.text);

            if (!validationResult.isValid) {
                setError(`"${trimmedInput}" is not a recognized chemical element. Please try again.`);
                setIsLoading(false);
                return;
            }

            // Step 2: Generate the Bohr diagram data for the validated element
            const diagramDataSchema = {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    symbol: { type: Type.STRING },
                    atomicNumber: { type: Type.INTEGER },
                    electronsPerShell: {
                        type: Type.ARRAY,
                        items: { type: Type.INTEGER }
                    }
                },
                required: ['name', 'symbol', 'atomicNumber', 'electronsPerShell']
            };

            const diagramPrompt = `Generate the data for a Bohr diagram for the element "${validationResult.canonicalName}". Provide the element name, symbol, atomic number, and an array of the number of electrons in each shell for a neutral atom, starting with the innermost shell.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: diagramPrompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: diagramDataSchema,
                }
            });
            
            const data = JSON.parse(response.text) as BohrElementData;
            setBohrData(data);

        } catch (err) {
            console.error(err);
            setError("Could not generate diagram. There might have been an API error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 items-center">
            <div className="w-full bg-slate-800/50 rounded-lg p-4 md:p-6 border border-slate-700">
                <h2 className="text-lg font-semibold text-slate-100 mb-4">Generate Bohr Diagram</h2>
                <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        value={elementInput}
                        onChange={(e) => setElementInput(e.target.value)}
                        placeholder="Enter element (e.g., Carbon, C, 6)"
                        className="flex-grow bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                        aria-label="Element Input"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : 'Generate'}
                    </button>
                </form>
            </div>
            
            <div className="w-full min-h-[400px] bg-slate-800/50 rounded-lg border border-slate-700 p-4 flex items-center justify-center">
                {error && <p className="text-red-400 text-center">{error}</p>}
                {!isLoading && !error && !bohrData && (
                    <p className="text-slate-400 text-center">Enter an element and click 'Generate' to see its Bohr diagram.</p>
                )}
                {bohrData && <BohrDiagram data={bohrData} />}
            </div>
        </div>
    );
};

export default BohrDiagramGenerator;