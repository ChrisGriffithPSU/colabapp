//
//  HTTPPostRequest.swift
//  colab-client
//
//  Created by Chris Griffith on 2/27/24.
//

import Foundation

protocol HTTPPostRequest {
    func postData<T:Codable, RT: Codable>(as type: T.Type, requestBody: RT, endpoint: String) async throws -> T
}

extension HTTPPostRequest {
    func postData<T:Codable, RT: Encodable>(as type: T.Type, requestBody: RT, endpoint: String) async throws -> T {
        guard let url = URL(string: endpoint) else {
            throw APIError.requestFailed(description: "Invalid URL")
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")

        do {
            let jsonBody = try JSONEncoder().encode(requestBody)
            request.httpBody = jsonBody
            
            let (data, _) = try await URLSession.shared.data(for: request)
            
            return try JSONDecoder().decode(type, from: data)
        } catch {
            throw error as? APIError ?? .unknownError(error: error)
        }
    }
}
