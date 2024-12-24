import json
import requests


if __name__ =="__main__":
    number_of_questions = 5
    question_count = 0

    while question_count < number_of_questions:
        question = str(input("Question: " ))
        data = {
            "model" : "llama2",
            "messages" : [{"role": "user", "content": question}],
            "stream" : False
        }
        url = "http://localhost:11434/api/chat"
        response = requests.post(url,json=data)

        response_json = json.loads(response.text)

        aiAgent_reply = response_json["message"]["content"]
        print(aiAgent_reply)
        question_count += 1