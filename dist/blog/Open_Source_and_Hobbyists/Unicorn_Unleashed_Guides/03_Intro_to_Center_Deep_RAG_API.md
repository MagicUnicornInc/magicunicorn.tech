# Blog Post: Build a "Chat with Your PDF" App in 20 Lines of Python

**Series:** Unicorn Unleashed: A Hacker's Guide

---

## Giving Your LLM a Library Card

Large Language Models (LLMs) are incredibly powerful, but they have a fundamental limitation: they only know what they were trained on. They can't access your private documents, recent articles, or internal knowledge bases. **Retrieval-Augmented Generation (RAG)** is the technology that solves this, and our **Center-Deep** platform makes it incredibly simple to use.

This tutorial will show you how to use the Center-Deep API to build a complete "chat with your document" application in just a handful of Python code.

### The RAG Workflow, Simplified

Center-Deep handles all the complex parts of RAG for you:

1.  **Ingestion & Chunking:** It takes your document (PDF, TXT, etc.) and breaks it into small, searchable pieces.
2.  **Embedding:** It uses a powerful AI model to convert each piece into a "vector"—a numerical representation of its meaning.
3.  **Indexing:** It stores these vectors in a specialized Qdrant database, optimized for lightning-fast semantic search.

All you have to do is make a few simple API calls.

### Step 1: Setup

```bash
# Install the client libraries
pip install center-deep-client openai

# Set your API keys
export CENTER_DEEP_API_KEY="..." # Get from our dev portal
export OPENAI_API_KEY="..."     # Or any other LLM provider
```

### Step 2: The Code (`chat_with_doc.py`)

This script will do everything: upload a document, ask a question about it, retrieve the relevant context, and have an LLM answer the question based *only* on that context.

```python
from center_deep import Client
import openai
import sys

# --- SETUP ---
if len(sys.argv) < 3:
    print("Usage: python chat_with_doc.py <path_to_doc> \"<your_question>\"")
    sys.exit(1)

doc_path = sys.argv[1]
question = sys.argv[2]

client = Client()
llm_client = openai.OpenAI()

# --- 1. UPLOAD & INDEX ---
print(f"Uploading {doc_path} to a new knowledge base...")
kb = client.create_knowledge_base(name="My Doc KB")
kb.upload_file(doc_path)

# --- 2. SEARCH (RETRIEVAL) ---
print(f"Searching for context related to: '{question}'...")
context_chunks = kb.search(query=question, top_k=3)
context_str = "\n".join([chunk.text for chunk in context_chunks])

# --- 3. AUGMENT & GENERATE ---
augmented_prompt = f"""
Based *only* on the following context, answer the user's question.

Context:
---
{context_str}
---

Question: {question}
Answer:"""

print("Sending augmented prompt to LLM...")
response = llm_client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": augmented_prompt}]
)

# --- 4. GET THE ANSWER ---
print("\n--- AI Answer ---")
print(response.choices[0].message.content)

# You can clean up the knowledge base afterwards
client.delete_knowledge_base(name="My Doc KB")
```

### Step 3: Run It!

Now, from your terminal:

```bash
python chat_with_doc.py ./my_report.pdf "What were the key findings in Q3?"
```

In seconds, you'll get an answer that is grounded in the facts from your document, not just the LLM's general knowledge. You've just built a complete RAG pipeline!

### Conclusion

This is the power of an API-first design. **Center-Deep** abstracts away the complexity of data pipelines, vector databases, and embedding models, letting you add powerful knowledge retrieval capabilities to your applications with minimal effort.