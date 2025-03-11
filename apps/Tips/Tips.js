
import Window from "@/components/Window";
import { tips } from "@/utils/tips";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const Tips = ({...props}) => {

  return (
    <Window {...props} 
    >
        <div className="text-white overflow-auto p-4 w-full h-full prose prose-invert max-w-full leading-none">
            <ReactMarkdown>
                {tips}
            </ReactMarkdown>
        </div>
    </Window>
  )
}

export default Tips