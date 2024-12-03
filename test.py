from locust import HttpUser, task, between
import random

class CRUDUser(HttpUser):
    # Set the wait time between requests for simulated users
    wait_time = between(1, 5)

    @task
    def create_document(self):
        collection_name = "testCollection"
        document_id = f"doc-{random.randint(1, 1000)}"
        data = {"field1": "value1", "field2": random.randint(1, 100)}

        response = self.client.post(
            "/create",
            json={
                "collection": collection_name,
                "id": document_id,
                "data": data
            },
        )
        if response.status_code == 201:
            print("Document created successfully")
        else:
            print(f"Create failed: {response.status_code} - {response.text}")

    @task
    def read_document(self):
        collection_name = "testCollection"
        document_id = f"doc-{random.randint(1, 1000)}"  # Use existing IDs for better results

        response = self.client.get(f"/read/{collection_name}/{document_id}")
        if response.status_code == 200:
            print("Document read successfully")
        else:
            print(f"Read failed: {response.status_code} - {response.text}")

    @task
    def update_document(self):
        collection_name = "testCollection"
        document_id = f"doc-{random.randint(1, 1000)}"
        updated_data = {"field1": "updatedValue", "field2": random.randint(1, 100)}

        response = self.client.put(
            "/update",
            json={
                "collection": collection_name,
                "id": document_id,
                "data": updated_data
            },
        )
        if response.status_code == 200:
            print("Document updated successfully")
        else:
            print(f"Update failed: {response.status_code} - {response.text}")

    @task
    def delete_document(self):
        collection_name = "testCollection"
        document_id = f"doc-{random.randint(1, 1000)}"

        response = self.client.delete(f"/delete/{collection_name}/{document_id}")
        if response.status_code == 200:
            print("Document deleted successfully")
        else:
            print(f"Delete failed: {response.status_code} - {response.text}")
