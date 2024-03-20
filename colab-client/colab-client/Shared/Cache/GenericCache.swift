//
//  GenericCache.swift
//  colab-client
//
//  Created by Chris Griffith on 2/27/24.
//

import Foundation

class GenericCache {
    static let shared = GenericCache()
    
    private let cache = NSCache<NSString, NSData>()
    
    func set<T:Codable>(_ cacheData: T, forkey key: String) {
        guard let data = try? JSONEncoder().encode(cacheData) else { return }
        cache.setObject(data as NSData, forKey: key as NSString)
    }
    
    func get<T:Codable>(forkey key: String, as type: T.Type) -> T? {
        guard let data = cache.object(forKey: key as NSString) as Data? else { return nil }
        return try? JSONDecoder().decode(T.self, from: data)
    }
}
