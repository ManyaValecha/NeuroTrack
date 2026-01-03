import AssessmentFlow from '../components/assessment/AssessmentFlow';

export default function Assessment() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Voice Assessment</h1>
                <span className="text-slate-500 text-sm">Azure Cognitive Services &gt; Speech</span>
            </div>

            <AssessmentFlow />
        </div>
    )
}
