import json
import requests

if __name__ =="__main__":
    number_of_questions = 5
    question_count = 0

    while question_count < number_of_questions:
        question = str(input("Questions: " ))
        data = {
            # "model" : "llama3",
            "messages" : [{"role": "user", "content": question}],
            "stream" : False
        }
        url = "http://localhost:2222/api/chat"
        response = requests.post(url,json=data)

        response_json = json.loads(response.text)

        aiAgent_reply = response_json["message"]["content"]

        question_count += 1