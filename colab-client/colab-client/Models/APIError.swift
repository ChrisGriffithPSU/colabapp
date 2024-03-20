//
//  APIError.swift
//  colab-client
//
//  Created by Chris Griffith on 2/27/24.
//

import Foundation

enum APIError: Error {
    case InvalidData
    case jsonParsingFailure
    case requestFailed(description: String)
    case invalidStatusCode(statusCode: Int)
    case unknownError(error: Error)
    
    var customDescription: String {
        switch self {
            case .InvalidData: return "Invalid Data"
            case .jsonParsingFailure: return "Failed to parse JSON"
            case let .requestFailed(description): return "Request Failed: \(description)"
            case let .invalidStatusCode(statusCode): return "Invalid Status Code: \(statusCode)"
            case let .unknownError(error): return "Unknown Error: \(error.localizedDescription)"
        }
    }
}
