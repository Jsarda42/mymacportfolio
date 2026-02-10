"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { EXERCISES } from '@/data/exercices/exercices';

interface TerminalLine {
    text: string;
    isError: boolean;
}

export default function ProgressiveIDE() {
    const [levelIndex, setLevelIndex] = useState(0);
    const [code, setCode] = useState(EXERCISES[0].initialCode);
    const [output, setOutput] = useState<TerminalLine[]>([]);
    const [activeHint, setActiveHint] = useState<string | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const currentEx = EXERCISES[levelIndex];

    useEffect(() => {
        setCode(currentEx.initialCode);
        setOutput([]);
        setIsComplete(false);
        setActiveHint(null);
        setShowHint(false);
    }, [levelIndex, currentEx.initialCode]);

    useEffect(() => {
        const handleMessage = (e: MessageEvent) => {
            if (e.data.type === 'RESULT') {
                const [userOut, validation] = (e.data.result || "").split("---VALIDATION_START---");
                const newLogs: TerminalLine[] = [];

                if (userOut?.trim()) {
                    newLogs.push({ text: userOut.trim(), isError: false });
                }

                if (validation?.trim()) {
                    const lines = validation.trim().split('\n');
                    lines.forEach((line: string) => {
                        if (line.includes("💡 HINT:")) {
                            const hintText = line.replace("💡 HINT:", "").trim();                            setActiveHint(hintText);
                        } else {
                            const isPass = line.includes("PASSED");
                            newLogs.push({
                                text: isPass ? "✅ PASSED!" : line.trim(),
                                isError: !isPass
                            });
                            if (isPass) setIsComplete(true);
                        }
                    });
                }
                setOutput(newLogs);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const runCode = () => {
        if (!iframeRef.current?.contentWindow) return;
        setOutput([]);
        setActiveHint(null);
        setShowHint(false);
        setIsComplete(false);

        const fullUserCode = `${currentEx.lockedCode}\n${code}`;
        iframeRef.current.contentWindow.postMessage({
            type: 'RUN',
            setupCode: currentEx.setupCode,
            userCode: fullUserCode,
            secretTest: currentEx.secretTest
        }, '*');
    };

    const lockedLineCount = useMemo(() => currentEx.lockedCode.split('\n').length, [currentEx.lockedCode]);

    return (
        <div className="h-screen w-full flex flex-col bg-[#0d1117] text-white overflow-hidden font-sans">
            {/* HEADER */}
            <header className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-[#161b22] shrink-0">
                <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold tracking-[0.2em] text-blue-400 uppercase">
                        Module 00 / Ex {currentEx.id}
                    </span>
                    {isComplete && (
                        <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20 font-bold uppercase tracking-wider animate-pulse">
                            Success
                        </span>
                    )}
                </div>
                <button
                    onClick={runCode}
                    className="bg-green-600 hover:bg-green-500 px-5 py-1.5 rounded-md font-bold text-xs transition-all active:scale-95 shadow-lg shadow-green-900/20"
                >
                    COMPILE & RUN
                </button>
            </header>

            <main className="flex-1 flex overflow-hidden">
                <aside className="w-80 border-r border-white/10 flex flex-col bg-[#0d1117]">
                    <div className="p-6 flex-1 overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4 text-gray-100">{currentEx.title}</h2>
                        <div className="text-gray-400 text-sm leading-relaxed space-y-4 whitespace-pre-line">
                            {currentEx.instruction}
                        </div>

                        {activeHint && (
                            <div className="mt-8 border-t border-white/10 pt-6">
                                <button
                                    onClick={() => setShowHint(!showHint)}
                                    className="flex items-center gap-2 text-xs font-bold text-yellow-500 hover:text-yellow-400 transition-colors uppercase tracking-widest"
                                >
                                    <span>{showHint ? '▼' : '▶'} Need a hint?</span>
                                </button>
                                {showHint && (
                                    <div className="mt-3 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg text-xs text-yellow-200/80 leading-relaxed italic">
                                        {activeHint}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="p-6 border-t border-white/5 bg-white/2">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Progress</div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: isComplete ? '100%' : '10%' }} />
                        </div>
                    </div>
                </aside>

                <section className="flex-1 flex flex-col bg-[#1e1e1e]">
                    <div className="py-3 px-4 opacity-40 pointer-events-none select-none border-b border-white/5 bg-[#161b22]">
                        <pre className="font-mono text-[15px] leading-5.5 text-blue-300">
                            {currentEx.lockedCode}
                        </pre>
                    </div>
                    <div className="flex-1">
                        <Editor
                            height="100%"
                            defaultLanguage="python"
                            theme="vs-dark"
                            value={code}
                            onChange={(v) => setCode(v || "")}
                            options={{
                                fontSize: 15,
                                lineNumbers: (num) => (num + lockedLineCount).toString(),
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 16 },
                                fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                                fontLigatures: true,
                            }}
                        />
                    </div>
                </section>

                <aside className="w-80 bg-black p-4 font-mono text-xs flex flex-col">
                    <div className="text-gray-600 mb-4 border-b border-white/10 pb-2 uppercase tracking-widest font-bold text-[9px]">
                        Console Output
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2">
                        {output.map((line, i) => (
                            <pre key={i} className={`whitespace-pre-wrap ${line.isError ? 'text-red-400' : 'text-green-400'}`}>
                                {line.text}
                            </pre>
                        ))}
                        {output.length === 0 && <span className="text-gray-800">Ready for execution...</span>}
                    </div>
                </aside>
            </main>

            <iframe ref={iframeRef} src="/python-runner.html" className="hidden" />
        </div>
    );
}