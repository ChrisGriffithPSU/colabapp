//
//  KeychainService.swift
//  colab-client
//
//  Created by Chris Griffith on 3/1/24.
//

import Foundation
import Security

// Implement proper error handling

struct KeychainService {
    static let serviceName = "Colab App"
    static let accessTokenKey = "AccessToken"

    static func saveToken(_ token: String) {
        guard let tokenData = token.data(using: .utf8) else {
            return
        }
        
        let query = [
            kSecClass: kSecClassGenericPassword,
            kSecAttrService: serviceName,
            kSecAttrAccount: accessTokenKey,
            kSecValueData: tokenData
        ] as CFDictionary

        SecItemDelete(query) // Delete existing token if any
        
        let status = SecItemAdd(query, nil)
        guard status == errSecSuccess else {
            print("Error saving token to keychain")
            return
        }
        
        print("Token saved to keychain")
    }
    
    static func getToken() -> String? {
        let query = [
            kSecClass: kSecClassGenericPassword,
            kSecAttrService: serviceName,
            kSecAttrAccount: accessTokenKey,
            kSecMatchLimit: kSecMatchLimitOne,
            kSecReturnData: true
        ] as CFDictionary
        
        var dataTypeRef: AnyObject?
        let status = SecItemCopyMatching(query, &dataTypeRef)
        
        guard status == errSecSuccess, let data = dataTypeRef as? Data else {
            print("Error retrieving token from keychain")
            return nil
        }
        
        return String(data: data, encoding: .utf8)
    }
    
    static func deleteToken() {
        let query = [
            kSecClass: kSecClassGenericPassword,
            kSecAttrService: serviceName,
            kSecAttrAccount: accessTokenKey
        ] as CFDictionary
        
        let status = SecItemDelete(query)
        guard status == errSecSuccess else {
            print("Error deleting token from keychain")
            return
        }
        
        print("Token deleted from keychain")
    }
}

// Usage example:
//let token = "your_jwt_token_here"
//KeychainService.saveToken(token)
//
//if let retrievedToken = KeychainService.getToken() {
//    print("Retrieved token from keychain: \(retrievedToken)")
//}
